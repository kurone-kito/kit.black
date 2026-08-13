import { describe, expect, it } from 'vitest';
import {
  connectSrcPlaceholder,
  extractInlineScriptHashes,
  injectCspSources,
  scriptSrcPlaceholder,
  sentryConnectOrigin,
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

  it('skips scripts with a src attribute', () => {
    const html = '<script type="module" async src="/app.js"></script>';
    expect(extractInlineScriptHashes(html)).toStrictEqual([]);
  });

  it('skips empty inline scripts', () => {
    const html = '<script></script><script>   </script>';
    expect(extractInlineScriptHashes(html)).toStrictEqual([]);
  });

  it('produces a hash matching an independently-computed sha256', async () => {
    const { createHash } = await import('node:crypto');
    const body = 'window.manifest = { a: 1 };';
    const html = `<script>${body}</script>`;
    const expected = `sha256-${createHash('sha256').update(body).digest('base64')}`;
    expect(extractInlineScriptHashes(html)).toStrictEqual([expected]);
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
