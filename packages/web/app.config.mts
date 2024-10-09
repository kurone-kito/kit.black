import { defineConfig } from '@solidjs/start/config';

export default defineConfig({
  server: { prerender: { autoSubfolderIndex: false }, preset: 'static' },
});
