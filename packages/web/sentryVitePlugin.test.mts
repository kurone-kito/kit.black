import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  applyClientSentryConfig,
  createSentryVitePlugins,
} from './sentryVitePlugin.mjs';

const { sentryVitePluginMock } = vi.hoisted(() => ({
  sentryVitePluginMock: vi.fn(() => [{ enforce: 'pre', name: 'sentry-vite' }]),
}));

vi.mock('@sentry/vite-plugin', () => ({
  sentryVitePlugin: sentryVitePluginMock,
}));

beforeEach(() => {
  sentryVitePluginMock.mockClear();
});

describe('createSentryVitePlugins', () => {
  it('returns no plugins and does not call the upload plugin when the token is undefined', () => {
    const result = createSentryVitePlugins({ SENTRY_AUTH_TOKEN: undefined });
    expect(result).toEqual([]);
    expect(sentryVitePluginMock).not.toHaveBeenCalled();
  });

  it('returns no plugins and does not call the upload plugin when the token is empty', () => {
    const result = createSentryVitePlugins({ SENTRY_AUTH_TOKEN: '' });
    expect(result).toEqual([]);
    expect(sentryVitePluginMock).not.toHaveBeenCalled();
  });

  it('activates the upload plugin with the expected options when the token is set', () => {
    const result = createSentryVitePlugins({
      GITHUB_SHA: 'abc123',
      SENTRY_AUTH_TOKEN: 'token',
      SENTRY_ORG: 'kurone-kito',
      SENTRY_PROJECT: 'kit-black',
    });
    expect(sentryVitePluginMock).toHaveBeenCalledTimes(1);
    expect(sentryVitePluginMock).toHaveBeenCalledWith({
      authToken: 'token',
      org: 'kurone-kito',
      project: 'kit-black',
      release: { name: 'abc123' },
      sourcemaps: {
        filesToDeleteAfterUpload: ['.vinxi/**/*.map', 'dist/**/*.map'],
      },
    });
    expect(result).toEqual([{ enforce: 'pre', name: 'sentry-vite' }]);
  });

  it('omits the release, org, and project options and falls back to the plugin defaults when only the token is set', () => {
    createSentryVitePlugins({ SENTRY_AUTH_TOKEN: 'token' });
    expect(sentryVitePluginMock).toHaveBeenCalledWith({
      authToken: 'token',
      sourcemaps: {
        filesToDeleteAfterUpload: ['.vinxi/**/*.map', 'dist/**/*.map'],
      },
    });
  });
});

describe('applyClientSentryConfig', () => {
  const baseVite = { plugins: [{ name: 'markdown-it' }] };

  it('leaves the server router config completely unchanged', () => {
    const result = applyClientSentryConfig('server', baseVite, {
      SENTRY_AUTH_TOKEN: 'token',
    });
    expect(result).toBe(baseVite);
    expect(sentryVitePluginMock).not.toHaveBeenCalled();
  });

  it('leaves the server-function router config completely unchanged', () => {
    const result = applyClientSentryConfig('server-function', baseVite, {
      SENTRY_AUTH_TOKEN: 'token',
    });
    expect(result).toBe(baseVite);
    expect(sentryVitePluginMock).not.toHaveBeenCalled();
  });

  it('disables sourcemap generation and adds no plugin for the client router when the token is absent', () => {
    const result = applyClientSentryConfig('client', baseVite, {
      SENTRY_AUTH_TOKEN: undefined,
    });
    expect(result).toEqual({
      ...baseVite,
      build: { sourcemap: false },
      plugins: [{ name: 'markdown-it' }],
    });
    expect(sentryVitePluginMock).not.toHaveBeenCalled();
  });

  it('enables sourcemap generation and appends the upload plugin for the client router when the token is set', () => {
    const result = applyClientSentryConfig('client', baseVite, {
      SENTRY_AUTH_TOKEN: 'token',
    });
    expect(result).toEqual({
      ...baseVite,
      build: { sourcemap: true },
      plugins: [
        { name: 'markdown-it' },
        { enforce: 'pre', name: 'sentry-vite' },
      ],
    });
  });
});
