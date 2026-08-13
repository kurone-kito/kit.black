import { readdir } from 'node:fs/promises';
import { parse } from 'node:path';
import { defineConfig } from '@solidjs/start/config';
import { createSentryVitePlugins } from './sentryVitePlugin.mts';
import vite from './vite.config.mjs';

/**
 * Get the names of the files in a directory.
 * @param dir The directory.
 * @returns The names of the files.
 */
const getNames = async (dir: string) =>
  (await readdir(dir, { withFileTypes: true }))
    .filter((dirent) => dirent.isFile())
    .map(({ name }) => parse(name).name);

/** The locales. */
const locales = (await getNames('src/i18n')).filter((name) =>
  /^[a-z]{2}$/.test(name),
);

/** The pages. */
const pages = await getNames('src/routes/[[language]]');

export default defineConfig({
  server: {
    hooks: {
      'prerender:routes': async (routes) => {
        pages.forEach((route) => {
          const r = route === 'index' ? '' : route;
          routes.add(`/${r}`);
          locales.forEach((locale) => routes.add(`/${locale}/${r}`));
        });
      },
    },
    prerender: { autoSubfolderIndex: false, routes: [] },
    preset: 'netlify-static',
  },
  // The client router is the only one shipped to production behind
  // `netlify-static` (the `server` / `server-function` routers only run
  // at prerender time), so the Sentry sourcemap-upload plugin and the
  // sourcemap generation it needs are scoped to that router alone.
  vite: ({ router }) =>
    router === 'client'
      ? {
          ...vite,
          build: { sourcemap: Boolean(process.env['SENTRY_AUTH_TOKEN']) },
          plugins: [
            ...(vite.plugins ?? []),
            ...createSentryVitePlugins(process.env),
          ],
        }
      : vite,
});
