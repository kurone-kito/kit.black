import { defineConfig } from '@solidjs/start/config';
import vite from './vite.config.mjs';

export default defineConfig({
  server: {
    prerender: { autoSubfolderIndex: false },
    preset: 'netlify-static',
  },
  vite,
});
