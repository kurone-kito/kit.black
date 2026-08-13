import { describe, expect, it } from 'vitest';
import { buildManifest } from './generate-manifest.mjs';

describe('buildManifest', () => {
  it('builds the manifest from the site constants', () => {
    const manifest = buildManifest({
      color: { dark: '#15191E', light: '#E5E6E6' },
      site: { name: '🐱 黒音キト -Kuroné Kito- :: official site' },
    });
    expect(manifest).toStrictEqual({
      name: '🐱 黒音キト -Kuroné Kito- :: official site',
      short_name: 'Kuroné Kito',
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      theme_color: '#15191E',
      background_color: '#E5E6E6',
      display: 'standalone',
    });
  });
});
