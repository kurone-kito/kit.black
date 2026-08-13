import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import yaml from 'js-yaml';

/**
 * The subset of the site constants this generator needs.
 * @typedef {object} ManifestSourceConstants
 * @property {{dark: string, light: string}} color The theme colors.
 * @property {{name: string}} site The site identity.
 */

/**
 * One icon entry in the web app manifest.
 * @typedef {object} ManifestIcon
 * @property {string} src The icon URL.
 * @property {string} sizes The icon dimensions, e.g. `'192x192'`.
 * @property {string} type The icon MIME type.
 */

/**
 * The web app manifest shape this generator produces.
 * @typedef {object} WebAppManifest
 * @property {string} name The full site name.
 * @property {string} short_name The short site name.
 * @property {readonly ManifestIcon[]} icons The manifest icons.
 * @property {string} theme_color The theme color.
 * @property {string} background_color The background color.
 * @property {string} display The display mode.
 */

/**
 * The manifest-only icons. These paths are internal to the manifest
 * (no `<link>` tag references them directly, unlike the `constants.yaml`
 * `icons` used by `LinkList`), so they live here rather than being
 * duplicated into `constants.yaml`.
 * @type {readonly ManifestIcon[]}
 */
const manifestIcons = [
  { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
  { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
];

/**
 * Build the web app manifest object from the site constants.
 * @param {ManifestSourceConstants} constants The site constants (parsed
 * from `constants.yaml`).
 * @returns {WebAppManifest} The web app manifest object.
 */
export const buildManifest = (constants) => ({
  name: constants.site.name,
  short_name: 'Kuroné Kito',
  icons: manifestIcons,
  theme_color: constants.color.dark,
  background_color: constants.color.light,
  display: 'standalone',
});

/**
 * Whether this module was invoked directly (`node scripts/…mjs`), rather
 * than imported. Deliberately avoids `import.meta.main` (Node >=24.2
 * only): on an older Node, that property is `undefined` and the guard
 * below would silently skip the CLI body instead of writing the
 * manifest, with no error — the same fail-open no-op trap the project's
 * IDD-helper re-import tracked (roadmap #122). Comparing the resolved
 * module URL against the invoked script path works on every supported
 * Node version.
 */
const isMain = import.meta.url === pathToFileURL(process.argv[1] ?? '').href;

if (isMain) {
  const root = fileURLToPath(new URL('..', import.meta.url));
  const raw = await readFile(`${root}/src/constants.yaml`, 'utf8');
  const constants = /** @type {ManifestSourceConstants} */ (yaml.load(raw));
  const manifest = buildManifest(constants);
  await writeFile(
    `${root}/public/site.webmanifest`,
    `${JSON.stringify(manifest, undefined, 2)}\n`,
  );
}
