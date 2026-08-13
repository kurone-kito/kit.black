import { sentryVitePlugin } from '@sentry/vite-plugin';
import type { Plugin } from 'vite';

/** The subset of `process.env` the Sentry sourcemap upload reads. */
export interface SentryVitePluginEnv {
  /**
   * The Sentry auth token. Skips the plugin entirely when empty or
   * undefined.
   */
  readonly SENTRY_AUTH_TOKEN?: string | undefined;
  /** The Sentry organization slug. */
  readonly SENTRY_ORG?: string | undefined;
  /** The Sentry project slug. */
  readonly SENTRY_PROJECT?: string | undefined;
  /**
   * The commit SHA to key the Sentry release to, so scheduled rebuilds of
   * an unchanged commit group under the same release instead of piling up
   * new ones. Falls back to the plugin's own git-HEAD auto-detection when
   * absent (e.g. local builds).
   */
  readonly GITHUB_SHA?: string | undefined;
}

/**
 * Builds the Vite plugin list that uploads production sourcemaps to
 * Sentry for the client build.
 *
 * No-ops (returns an empty array — no plugin registered at all) when
 * `SENTRY_AUTH_TOKEN` is empty or undefined, so builds without the token —
 * local dev, CI on pull requests, and any environment lacking the secret —
 * perform no upload attempt, no warning, and no build failure.
 * @param env The environment variables to read the upload configuration
 * from, typically `process.env`.
 * @returns The Vite plugins to add; empty when the token is absent.
 */
export const createSentryVitePlugins = ({
  SENTRY_AUTH_TOKEN: authToken,
  SENTRY_ORG: org,
  SENTRY_PROJECT: project,
  GITHUB_SHA: release,
}: SentryVitePluginEnv): Plugin[] =>
  authToken
    ? sentryVitePlugin({
        authToken,
        ...(org ? { org } : {}),
        ...(project ? { project } : {}),
        ...(release ? { release: { name: release } } : {}),
        sourcemaps: {
          // The build never publishes sourcemaps to Netlify: delete every
          // map this build produced, in both the vinxi per-router staging
          // directories and (defensively) the final `dist/` output, once
          // the upload above has completed.
          filesToDeleteAfterUpload: ['.vinxi/**/*.map', 'dist/**/*.map'],
        },
      })
    : [];
