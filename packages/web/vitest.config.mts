import solidPlugin from 'vite-plugin-solid';
import { mergeConfig } from 'vitest/config';
import defaultConfig from './vite.config.mjs';

export default mergeConfig(defaultConfig, {
  // `hot: false` keeps vite-plugin-solid from registering its
  // `/@solid-refresh` HMR runtime module for test runs. HMR is
  // meaningless under a one-shot `vitest run`, and vitest 4's module
  // runner cannot resolve that virtual module id into a `file://` URL
  // on Windows (`pathToFileURL` requires a drive-letter-qualified
  // absolute path there), which crashed every Windows test run after
  // the vitest 3 to 4 bump.
  plugins: [solidPlugin({ hot: false })],
  test: { environment: 'jsdom', setupFiles: ['./vitest.setup.mts'] },
});
