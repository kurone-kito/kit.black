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

/**
 * Resource-loading tag/attribute combinations the CSP's fetch
 * directives actually govern. `<a href>` and metadata `<link
 * rel="alternate|author|canonical|license">` are navigation targets,
 * not subresource loads, so they are deliberately excluded — CSP does
 * not gate them.
 */
const resourceLoadPattern =
  /<(script|img|source|audio|video|iframe)\b[^>]*\ssrc=["'](https?:\/\/[^"']+)["']|<link\b[^>]*\srel=["'](?:stylesheet|preload|modulepreload|icon|manifest)["'][^>]*\shref=["'](https?:\/\/[^"']+)["']/gi;

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
        for (const match of html.matchAll(resourceLoadPattern)) {
          violations.push({ file, url: match[2] ?? match[3] });
        }
      }
      expect(violations).toStrictEqual([]);
    });
  },
);
