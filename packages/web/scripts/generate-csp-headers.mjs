import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

/**
 * A `_headers` file's Content-Security-Policy `script-src` value before
 * this script patches in the build's actual inline-script hashes. Kept
 * as a bare `'self'` (not a real hash list) so that a `vinxi build` run
 * without this postbuild step fails inline scripts closed instead of
 * silently shipping an unpatched, overly-permissive header.
 * @type {string}
 */
export const scriptSrcPlaceholder = "script-src 'self';";

/**
 * The `connect-src` placeholder this script extends with the Sentry
 * ingest origin, only when a build-time DSN is present.
 * @type {string}
 */
export const connectSrcPlaceholder = "connect-src 'self';";

/**
 * The `worker-src` placeholder this script extends with `blob:`, only
 * when a build-time Sentry DSN is present. Sentry Session Replay's
 * compression worker is always bundled (it ships regardless of whether
 * a DSN is configured — only the runtime `init()` call is DSN-gated),
 * and empirically creates its worker from a same-origin-restricted
 * `Blob` + `URL.createObjectURL()` (a `blob:` URL), which `'self'`
 * alone does not permit. See the PR body for how this was verified.
 * @type {string}
 */
export const workerSrcPlaceholder = "worker-src 'self';";

/**
 * Recursively collect every `.html` file under a directory.
 * @param {string} dir The directory to walk.
 * @returns {Promise<string[]>} The absolute paths of every `.html` file
 * found, in no particular order.
 */
export const collectHtmlFiles = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const found = await Promise.all(
    entries.map(async (entry) => {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) return collectHtmlFiles(full);
      return entry.isFile() && entry.name.endsWith('.html') ? [full] : [];
    }),
  );
  return found.flat();
};

/**
 * Extract a CSP `script-src` hash source for every distinct, non-empty
 * inline `<script>` block in an HTML document.
 *
 * A prerendered SolidStart page inlines its hydration bootstrap and
 * asset manifest directly in `<script>` tags, and the manifest embeds
 * content-hashed asset filenames — so these hashes change on every
 * build and must be computed from the actual output, never hand-copied.
 * A `<script src="…">` tag referencing a same-origin file is already
 * covered by `'self'` and is skipped.
 * @param {string} html The HTML document text.
 * @returns {string[]} Deduped `sha256-<base64>` source list entries.
 */
export const extractInlineScriptHashes = (html) => {
  const hashes = new Set();
  // HTML tag names and attribute names are case-insensitive per spec
  // (`<SCRIPT SRC=…>` is as valid as `<script src=…>`), so both this
  // tag matcher and the `src=` attribute check below use the `i` flag —
  // a case-sensitive version would silently miss an uppercase/mixed-case
  // script tag, dropping a real inline script's hash from the CSP. The
  // end tag also allows trailing whitespace before `>` (`</script >` is
  // valid HTML), which a bare `<\/script>` literal would not match.
  for (const [, attrs, body] of html.matchAll(
    /<script((?:\s[^>]*)?)>([\s\S]*?)<\/script\s*>/gi,
  )) {
    // Only the opening tag's own attributes may carry `src=`; matching
    // against the whole tag (attrs + body) would false-positive on a
    // script body that happens to contain the literal text `<script
    // src=`, e.g. an embedded HTML string in the asset manifest.
    if (/\ssrc=/i.test(attrs) || !body.trim()) continue;
    hashes.add(`sha256-${createHash('sha256').update(body).digest('base64')}`);
  }
  return [...hashes];
};

/**
 * Replace a literal CSP directive placeholder (e.g.
 * {@link scriptSrcPlaceholder}) with the same directive extended by
 * additional source values.
 * @param {string} headersContent The `_headers` file content.
 * @param {string} placeholder The exact placeholder substring to find,
 * including its trailing `;`.
 * @param {readonly string[]} extraSources Additional source values
 * (already `'`-quoted or bare, e.g. `'sha256-…'` or
 * `https://example.test`) to append before the `;`.
 * @returns {string} The updated `_headers` content, unchanged when
 * `extraSources` is empty.
 * @throws {Error} If `placeholder` does not appear in `headersContent`.
 */
export const injectCspSources = (headersContent, placeholder, extraSources) => {
  if (!headersContent.includes(placeholder)) {
    throw new Error(
      `generate-csp-headers: expected the literal "${placeholder}" placeholder in _headers, but it was not found. Did the CSP line in public/_headers change?`,
    );
  }
  if (extraSources.length === 0) return headersContent;
  const directive = placeholder.slice(0, -1);
  const replacement = `${directive}${extraSources.map((s) => ` ${s}`).join('')};`;
  return headersContent.replace(placeholder, replacement);
};

/**
 * Derive the CSP `connect-src` origin Sentry's client SDK will call once
 * a DSN is configured, from that same DSN — never hand-guessed. A
 * Sentry DSN has the shape `https://<key>@<host>/<projectId>`; the
 * origin the SDK actually calls is `https://<host>`.
 * @param {string | undefined} dsn The `VITE_SENTRY_DSN` build-time
 * value, or `undefined`/empty when Sentry is not configured for this
 * build (the SDK itself no-ops in that case — see `initSentry.ts`).
 * @returns {string | undefined} The Sentry ingest origin, or
 * `undefined` when `dsn` is empty, undefined, or unparsable as a URL.
 */
export const sentryConnectOrigin = (dsn) => {
  if (!dsn) return undefined;
  try {
    return new URL(dsn).origin;
  } catch {
    return undefined;
  }
};

/**
 * The warning `sentryConnectOriginOrWarn` emits when `VITE_SENTRY_DSN`
 * is set but not a parsable URL. Exported so tests can assert on it
 * without duplicating the exact wording.
 * @type {string}
 */
export const malformedDsnWarning =
  'generate-csp-headers: VITE_SENTRY_DSN is set but not a parsable URL — ' +
  "shipping this build with connect-src/worker-src still pinned to 'self' " +
  '(and blob: omitted) would silently block Sentry telemetry once ' +
  'initSentry() runs with this same value. Fix or unset VITE_SENTRY_DSN.';

/**
 * {@link sentryConnectOrigin}, but logs {@link malformedDsnWarning} to
 * stderr on the failure case instead of failing silently — a DSN that
 * is present-but-unparsable would otherwise ship a CSP that blocks
 * Sentry's own beacons and Replay worker with no build-time signal, and
 * Sentry cannot report its own CSP-blocked traffic to itself.
 * @param {string | undefined} dsn See {@link sentryConnectOrigin}.
 * @returns {string | undefined} See {@link sentryConnectOrigin}.
 */
export const sentryConnectOriginOrWarn = (dsn) => {
  const origin = sentryConnectOrigin(dsn);
  if (dsn && !origin) console.warn(malformedDsnWarning);
  return origin;
};

/**
 * Whether this module was invoked directly (`node scripts/…mjs`), rather
 * than imported. Deliberately avoids `import.meta.main` (Node >=24.2
 * only) for the same fail-open-no-op reason documented in
 * `generate-manifest.mjs`.
 */
const isMain = import.meta.url === pathToFileURL(process.argv[1] ?? '').href;

if (isMain) {
  const root = fileURLToPath(new URL('..', import.meta.url));
  const distDir = `${root}/dist`;
  const htmlFiles = await collectHtmlFiles(distDir);
  const perFile = await Promise.all(
    htmlFiles.map(async (file) =>
      extractInlineScriptHashes(await readFile(file, 'utf8')),
    ),
  );
  const scriptHashes = [...new Set(perFile.flat())]
    .sort()
    .map((hash) => `'${hash}'`);

  const connectOrigin = sentryConnectOriginOrWarn(
    process.env['VITE_SENTRY_DSN'],
  );

  const headersPath = `${distDir}/_headers`;
  const original = await readFile(headersPath, 'utf8');
  const withScriptSrc = injectCspSources(
    original,
    scriptSrcPlaceholder,
    scriptHashes,
  );
  const withConnectSrc = injectCspSources(
    withScriptSrc,
    connectSrcPlaceholder,
    connectOrigin ? [connectOrigin] : [],
  );
  const withWorkerSrc = injectCspSources(
    withConnectSrc,
    workerSrcPlaceholder,
    connectOrigin ? ['blob:'] : [],
  );
  await writeFile(headersPath, withWorkerSrc);
}
