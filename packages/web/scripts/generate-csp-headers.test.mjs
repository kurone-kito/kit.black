import { describe, expect, it, vi } from 'vitest';
import {
  connectSrcPlaceholder,
  extractInlineScriptHashes,
  injectCspSources,
  malformedDsnWarning,
  scriptSrcPlaceholder,
  sentryConnectOrigin,
  sentryConnectOriginOrWarn,
  workerSrcPlaceholder,
} from './generate-csp-headers.mjs';

describe('extractInlineScriptHashes', () => {
  it('hashes each distinct non-empty inline script body', () => {
    const html = `<html><body>
      <script>const a = 1;</script>
      <script>const b = 2;</script>
    </body></html>`;
    const hashes = extractInlineScriptHashes(html);
    expect(hashes).toHaveLength(2);
    expect(hashes.every((h) => h.startsWith('sha256-'))).toBe(true);
  });

  it('deduplicates identical inline script bodies', () => {
    const html = '<script>const a = 1;</script><script>const a = 1;</script>';
    expect(extractInlineScriptHashes(html)).toHaveLength(1);
  });

  it('skips scripts with a src attribute, even when the body is non-empty', () => {
    // A non-empty body means this can only pass via the `src=` check
    // itself, not the separate empty-body skip below.
    const html =
      '<script type="module" async src="/app.js">not real content</script>';
    expect(extractInlineScriptHashes(html)).toStrictEqual([]);
  });

  it('matches upper- and mixed-case <SCRIPT> tags (HTML tag names are case-insensitive)', () => {
    const hashed = extractInlineScriptHashes('<SCRIPT>const a = 1;</SCRIPT>');
    expect(hashed).toHaveLength(1);
    const skipped = extractInlineScriptHashes(
      '<ScRiPt SRC="/app.js">not real content</ScRiPt>',
    );
    expect(skipped).toStrictEqual([]);
  });

  it('skips empty inline scripts', () => {
    const html = '<script></script><script>   </script>';
    expect(extractInlineScriptHashes(html)).toStrictEqual([]);
  });

  it('matches real-world end-tag forms browsers still honor', () => {
    // A browser's HTML tokenizer closes script raw-text mode on
    // `</script` followed by tab, newline, form feed, space, `/`, or
    // `>` — not only a bare `</script>`.
    const forms = [
      '<script>const a = 1;</script >',
      '<script>const a = 1;</script\t\n>',
      '<script>const a = 1;</script foo="bar">',
      '<script>const a = 1;</script/>',
    ];
    for (const html of forms) {
      expect(extractInlineScriptHashes(html)).toHaveLength(1);
    }
  });

  it('does not treat "</script" followed by a non-delimiter character as a close', async () => {
    // A browser does NOT recognize `</script-anything` as an end tag at
    // all (only tab/LF/FF/space/`/`/`>` may follow `</script`), so the
    // raw-text scan continues past it to the *real* closing tag. A
    // looser `\b`-word-boundary check would incorrectly stop here and
    // hash only the truncated `const a = 1;` prefix.
    const html = '<script>const a = 1;</script-fake>const b = 2;</script>';
    const { createHash } = await import('node:crypto');
    const body = 'const a = 1;</script-fake>const b = 2;';
    const expected = `sha256-${createHash('sha256').update(body).digest('base64')}`;
    expect(extractInlineScriptHashes(html)).toStrictEqual([expected]);
  });

  it('produces a hash matching an independently-computed sha256', async () => {
    const { createHash } = await import('node:crypto');
    const body = 'window.manifest = { a: 1 };';
    const html = `<script>${body}</script>`;
    const expected = `sha256-${createHash('sha256').update(body).digest('base64')}`;
    expect(extractInlineScriptHashes(html)).toStrictEqual([expected]);
  });

  it('does not false-positive on a script body that contains the text "<script src="', () => {
    // The manifest script legitimately embeds asset metadata as a
    // string; if that string happened to contain a script-tag-shaped
    // substring, only the *opening* tag's own attributes should decide
    // whether this is a src-referencing script.
    const body = 'window.manifest = { snippet: "<script src=\\"x.js\\">" };';
    const html = `<script>${body}</script>`;
    expect(extractInlineScriptHashes(html)).toHaveLength(1);
  });
});

describe('injectCspSources', () => {
  it('replaces the placeholder with the directive plus extra sources', () => {
    const headers = `/*\n  Content-Security-Policy: default-src 'self'; ${scriptSrcPlaceholder} style-src 'self'\n`;
    const result = injectCspSources(headers, scriptSrcPlaceholder, [
      "'sha256-AAA='",
      "'sha256-BBB='",
    ]);
    expect(result).toContain("script-src 'self' 'sha256-AAA=' 'sha256-BBB=';");
    expect(result).not.toContain(scriptSrcPlaceholder);
  });

  it('returns the content unchanged when there are no extra sources', () => {
    const headers = `Content-Security-Policy: ${scriptSrcPlaceholder}`;
    expect(injectCspSources(headers, scriptSrcPlaceholder, [])).toBe(headers);
  });

  it('throws when the placeholder is missing', () => {
    expect(() =>
      injectCspSources(
        "Content-Security-Policy: default-src 'self'",
        scriptSrcPlaceholder,
        ["'sha256-AAA='"],
      ),
    ).toThrow(/placeholder/);
  });

  it('works for the connect-src placeholder too', () => {
    const headers = `Content-Security-Policy: default-src 'self'; ${connectSrcPlaceholder}`;
    const result = injectCspSources(headers, connectSrcPlaceholder, [
      'https://o123.ingest.us.sentry.io',
    ]);
    expect(result).toContain(
      "connect-src 'self' https://o123.ingest.us.sentry.io;",
    );
  });

  it('works for the worker-src placeholder too', () => {
    const headers = `Content-Security-Policy: default-src 'self'; ${workerSrcPlaceholder}`;
    const result = injectCspSources(headers, workerSrcPlaceholder, ['blob:']);
    expect(result).toContain("worker-src 'self' blob:;");
  });
});

describe('sentryConnectOrigin', () => {
  it('returns undefined when the DSN is undefined', () => {
    expect(sentryConnectOrigin(undefined)).toBeUndefined();
  });

  it('returns undefined when the DSN is empty', () => {
    expect(sentryConnectOrigin('')).toBeUndefined();
  });

  it('derives the ingest origin from a realistic Sentry DSN', () => {
    expect(
      sentryConnectOrigin('https://examplekey@o123456.ingest.us.sentry.io/789'),
    ).toBe('https://o123456.ingest.us.sentry.io');
  });

  it('returns undefined for an unparsable DSN', () => {
    expect(sentryConnectOrigin('not-a-url')).toBeUndefined();
  });
});

describe('sentryConnectOriginOrWarn', () => {
  it('returns the origin and warns nothing when the DSN is valid', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(
      sentryConnectOriginOrWarn(
        'https://examplekey@o123456.ingest.us.sentry.io/789',
      ),
    ).toBe('https://o123456.ingest.us.sentry.io');
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('warns nothing when the DSN is unset', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(sentryConnectOriginOrWarn(undefined)).toBeUndefined();
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('warns when the DSN is set but unparsable, instead of failing silently', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(sentryConnectOriginOrWarn('not-a-url')).toBeUndefined();
    expect(warn).toHaveBeenCalledWith(malformedDsnWarning);
    warn.mockRestore();
  });
});
