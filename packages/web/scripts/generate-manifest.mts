import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

/** The subset of the site constants this generator needs. */
export interface ManifestSourceConstants {
  readonly color: { readonly dark: string; readonly light: string };
  readonly site: { readonly name: string };
}

/** One icon entry in the web app manifest. */
interface ManifestIcon {
  readonly src: string;
  readonly sizes: string;
  readonly type: string;
}

/** The web app manifest shape this generator produces. */
export interface WebAppManifest {
  readonly name: string;
  readonly short_name: string;
  readonly icons: readonly ManifestIcon[];
  readonly theme_color: string;
  readonly background_color: string;
  readonly display: string;
}

/**
 * The manifest-only icons. These paths are internal to the manifest
 * (no `<link>` tag references them directly, unlike the `constants.yaml`
 * `icons` used by `LinkList`), so they live here rather than being
 * duplicated into `constants.yaml`.
 */
const manifestIcons: readonly ManifestIcon[] = [
  { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
  { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
];

/**
 * Build the web app manifest object from the site constants.
 * @param constants The site constants (parsed from `constants.yaml`).
 * @returns The web app manifest object.
 */
export const buildManifest = (
  constants: ManifestSourceConstants,
): WebAppManifest => ({
  name: constants.site.name,
  short_name: 'Kuroné Kito',
  icons: manifestIcons,
  theme_color: constants.color.dark,
  background_color: constants.color.light,
  display: 'standalone',
});

if (import.meta.main) {
  const root = fileURLToPath(new URL('..', import.meta.url));
  const raw = await readFile(`${root}/src/constants.yaml`, 'utf8');
  const constants = yaml.load(raw) as ManifestSourceConstants;
  const manifest = buildManifest(constants);
  await writeFile(
    `${root}/public/site.webmanifest`,
    `${JSON.stringify(manifest, undefined, 2)}\n`,
  );
}
