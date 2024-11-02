import { readdir } from 'node:fs/promises';
import { parse } from 'node:path';
import { defineConfig } from '@solidjs/start/config';
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
  vite,
});
