import solidPlugin from 'vite-plugin-solid';
import { mergeConfig } from 'vitest/config';
import defaultConfig from './vite.config.mjs';

export default mergeConfig(defaultConfig, {
  plugins: [solidPlugin()],
  test: { environment: 'jsdom', setupFiles: ['./vitest.setup.mts'] },
});
