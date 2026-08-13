import { init, replayIntegration } from '@sentry/solidstart';
import { solidRouterBrowserTracingIntegration } from '@sentry/solidstart/solidrouter';

export interface InitSentryOptions {
  /** The Sentry DSN. Skips initialization when empty or undefined. */
  readonly dsn: string | undefined;
}

/**
 * Initializes Sentry error capture, tracing, and session replay.
 *
 * No-ops when `dsn` is empty or undefined, so DSN-less builds (local
 * dev, CI, PR previews) perform no network calls, console noise, or
 * build failure.
 * @param options The options.
 */
export const initSentry = ({ dsn }: InitSentryOptions): void => {
  if (!dsn) return;
  init({
    dsn,
    integrations: [solidRouterBrowserTracingIntegration(), replayIntegration()],
    replaysOnErrorSampleRate: 1,
    replaysSessionSampleRate: 0.1,
    tracesSampleRate: 1,
  });
};
