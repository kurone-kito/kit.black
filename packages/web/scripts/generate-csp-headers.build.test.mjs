// Integration coverage against the *actual* production build output,
// as opposed to generate-csp-headers.test.mjs's fixture-based unit
// tests. `dist/` only exists after `pnpm run build` (CI always builds
// before it lints/tests — see .github/workflows/push.yml — but a local
// `pnpm test` run without a prior build should not fail here), so every
// test below is skipped when it is absent.
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  collectHtmlFiles,
  extractInlineScriptHashes,
} from './generate-csp-headers.mjs';

// `join(process.cwd(), 'dist')` rather than an `import.meta.url`-derived
// path: vitest's module loader for this file does not always expose a
// plain `file:` URL, and every `test` script in this monorepo (`pnpm
// run -r test`) already runs with the package root as its cwd.
const distDir = join(process.cwd(), 'dist');
const hasDist = existsSync(distDir);

/** Tag names whose `src=` attribute is a resource load CSP governs. */
const srcTagNames = /** @type {const} */ ([
  'script',
  'img',
  'source',
  'audio',
  'video',
  'iframe',
]);

/** `<link rel=…>` values that load a subresource, as opposed to
 * metadata/navigation values (`alternate`, `author`, `canonical`,
 * `license`) that CSP does not gate. */
const resourceLinkRels = /** @type {const} */ ([
  'stylesheet',
  'preload',
  'modulepreload',
  'icon',
  'manifest',
]);

/**
 * Read one attribute's value from a captured attribute string,
 * tolerating single, double, or no quotes — real HTML permits all
 * three, and this file's own attribute order (`rel` before `href`, or
 * the reverse) must not matter either. Two-pass by design (tag first,
 * then attributes independently) rather than one attribute-order-locked
 * regex, per the review finding that flagged the single-regex version
 * as matching zero real `<link>` tags in this codebase's own build
 * (which always emits `href` before `rel`).
 * @param {string} attrs The tag's attribute string (between the tag
 * name and the closing `>`).
 * @param {string} name The attribute name to read.
 * @returns {string | undefined} The attribute's value, or `undefined`
 * when the attribute is absent.
 */
const readAttr = (attrs, name) =>
  attrs.match(new RegExp(`\\s${name}=["']?([^"'\\s>]+)`, 'i'))?.[1];

/**
 * Same as {@link readAttr}, but for a value that may itself contain
 * internal whitespace (only `srcset` today: a comma-separated `url
 * descriptor, …` list). {@link readAttr}'s `[^"'\s>]+` would truncate
 * at the value's first internal space, so this instead requires a
 * matching quote pair and captures everything up to it. An unquoted
 * `srcset` cannot legally contain a space or comma at all, so this
 * intentionally does not attempt the unquoted case.
 * @param {string} attrs See {@link readAttr}.
 * @param {string} name See {@link readAttr}.
 * @returns {string | undefined} See {@link readAttr}.
 */
const readQuotedAttr = (attrs, name) =>
  attrs.match(new RegExp(`\\s${name}=["']([^"']+)["']`, 'i'))?.[1];

/**
 * Find every resource-loading reference to a third-party (`http(s)://`)
 * origin in one HTML document: `src=` on a script/img/source/audio/
 * video/iframe tag, `href=` on a resource-loading `<link>`, and every
 * `srcset` candidate URL. `<a href>` and metadata `<link
 * rel="alternate|author|canonical|license">` are navigation targets,
 * not subresource loads, so they are deliberately excluded — CSP does
 * not gate them.
 * @param {string} html The HTML document text.
 * @returns {string[]} Every offending third-party URL found.
 */
const findThirdPartyResourceLoads = (html) => {
  const urls = [];

  for (const tagName of srcTagNames) {
    for (const [, attrs] of html.matchAll(
      new RegExp(`<${tagName}\\b([^>]*)>`, 'gi'),
    )) {
      const src = readAttr(attrs, 'src');
      if (src && /^https?:\/\//i.test(src)) urls.push(src);
    }
  }

  for (const [, attrs] of html.matchAll(/<link\b([^>]*)>/gi)) {
    const rel = readAttr(attrs, 'rel');
    const href = readAttr(attrs, 'href');
    if (
      rel &&
      href &&
      /^https?:\/\//i.test(href) &&
      resourceLinkRels.includes(/** @type {never} */ (rel.toLowerCase()))
    ) {
      urls.push(href);
    }
  }

  // `srcset` candidates are a comma-separated `url descriptor, …` list,
  // so an external origin need not start the attribute value the way a
  // bare `src` does — check every whitespace-delimited token in each
  // `srcset` value, not just the raw attribute string. Kept as a
  // separate check (rather than folded into the CSP source list today)
  // so this stays a regression guard once #151 adds responsive image
  // variants.
  for (const [, attrs] of html.matchAll(/<(?:img|source)\b([^>]*)>/gi)) {
    const srcset = readQuotedAttr(attrs, 'srcset');
    if (!srcset) continue;
    for (const candidate of srcset.split(',')) {
      const url = candidate.trim().split(/\s+/)[0];
      if (url && /^https?:\/\//i.test(url)) urls.push(url);
    }
  }

  return urls;
};

// Fixture-based coverage for findThirdPartyResourceLoads itself (always
// runs, unlike the dist/-gated suite below): this repo's own build
// output happens to emit href-before-rel on every real <link> tag, so
// the dist/-based suite alone would never actually exercise the
// order-independence this function exists to provide.
describe('findThirdPartyResourceLoads', () => {
  it('detects a <link> resource load regardless of rel/href attribute order', () => {
    const relFirst = '<link rel="stylesheet" href="https://evil.test/x.css">';
    const hrefFirst = '<link href="https://evil.test/x.css" rel="stylesheet">';
    expect(findThirdPartyResourceLoads(relFirst)).toStrictEqual([
      'https://evil.test/x.css',
    ]);
    expect(findThirdPartyResourceLoads(hrefFirst)).toStrictEqual([
      'https://evil.test/x.css',
    ]);
  });

  it('ignores navigation-only <link> rel values', () => {
    const html =
      '<link href="https://kit.black/ja/" rel="alternate" hreflang="ja">';
    expect(findThirdPartyResourceLoads(html)).toStrictEqual([]);
  });

  it('ignores <a href> navigation links entirely', () => {
    expect(
      findThirdPartyResourceLoads('<a href="https://github.com/x">link</a>'),
    ).toStrictEqual([]);
  });

  it('detects a third-party <script src> and <img src>, quoted or not', () => {
    expect(
      findThirdPartyResourceLoads(
        '<script src="https://evil.test/a.js"></script>',
      ),
    ).toStrictEqual(['https://evil.test/a.js']);
    expect(
      findThirdPartyResourceLoads('<img src=https://evil.test/a.webp>'),
    ).toStrictEqual(['https://evil.test/a.webp']);
  });

  it('detects a third-party origin anywhere in a srcset candidate list', () => {
    const html = '<img srcset="/local.webp 1x, https://evil.test/a.webp 2x">';
    expect(findThirdPartyResourceLoads(html)).toStrictEqual([
      'https://evil.test/a.webp',
    ]);
  });

  it('finds nothing in same-origin-only markup', () => {
    const html =
      '<script src="/app.js"></script><link href="/site.css" rel="stylesheet"><img src="/a.webp" srcset="/a.webp 1x, /a-2x.webp 2x">';
    expect(findThirdPartyResourceLoads(html)).toStrictEqual([]);
  });
});

describe.skipIf(!hasDist)(
  'production build output matches the shipped CSP',
  () => {
    it('every inline <script> hash in the built HTML is present in dist/_headers', async () => {
      const htmlFiles = await collectHtmlFiles(distDir);
      expect(htmlFiles.length).toBeGreaterThan(0);
      const headers = await readFile(`${distDir}/_headers`, 'utf8');
      const cspLine = headers
        .split('\n')
        .find((line) => line.includes('Content-Security-Policy'));
      expect(cspLine).toBeDefined();

      const missing = [];
      for (const file of htmlFiles) {
        const html = await readFile(file, 'utf8');
        for (const hash of extractInlineScriptHashes(html)) {
          if (!cspLine.includes(`'${hash}'`)) missing.push({ file, hash });
        }
      }
      expect(missing).toStrictEqual([]);
    });

    it('no built page loads a third-party script, stylesheet, image, or media resource', async () => {
      const htmlFiles = await collectHtmlFiles(distDir);
      const violations = [];
      for (const file of htmlFiles) {
        const html = await readFile(file, 'utf8');
        for (const url of findThirdPartyResourceLoads(html)) {
          violations.push({ file, url });
        }
      }
      expect(violations).toStrictEqual([]);
    });
  },
);
