import { beforeEach, describe, expect, it, vi } from 'vitest';
import { initSentry } from './initSentry.js';

const {
  initMock,
  replayIntegrationMock,
  solidRouterBrowserTracingIntegrationMock,
} = vi.hoisted(() => ({
  initMock: vi.fn(),
  replayIntegrationMock: vi.fn(() => ({ name: 'Replay' })),
  solidRouterBrowserTracingIntegrationMock: vi.fn(() => ({
    name: 'BrowserTracing',
  })),
}));

vi.mock('@sentry/solidstart', () => ({
  init: initMock,
  replayIntegration: replayIntegrationMock,
}));

vi.mock('@sentry/solidstart/solidrouter', () => ({
  solidRouterBrowserTracingIntegration:
    solidRouterBrowserTracingIntegrationMock,
}));

beforeEach(() => {
  initMock.mockClear();
  replayIntegrationMock.mockClear();
  solidRouterBrowserTracingIntegrationMock.mockClear();
});

describe('initSentry', () => {
  it('does not initialize Sentry when the DSN is undefined', () => {
    initSentry({ dsn: undefined });
    expect(initMock).not.toHaveBeenCalled();
  });

  it('does not initialize Sentry when the DSN is empty', () => {
    initSentry({ dsn: '' });
    expect(initMock).not.toHaveBeenCalled();
  });

  it('initializes Sentry with the expected options when the DSN is set', () => {
    initSentry({ dsn: 'https://example.test/1' });
    expect(solidRouterBrowserTracingIntegrationMock).toHaveBeenCalledTimes(1);
    expect(replayIntegrationMock).toHaveBeenCalledTimes(1);
    expect(initMock).toHaveBeenCalledTimes(1);
    expect(initMock).toHaveBeenCalledWith({
      dsn: 'https://example.test/1',
      integrations: [{ name: 'BrowserTracing' }, { name: 'Replay' }],
      replaysOnErrorSampleRate: 1,
      replaysSessionSampleRate: 0.1,
      tracesSampleRate: 1,
    });
  });
});
