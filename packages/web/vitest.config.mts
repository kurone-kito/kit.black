import solidPlugin from 'vite-plugin-solid';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [solidPlugin()],
  test: { environment: 'jsdom', setupFiles: ['./vitest.setup.mts'] },
});
