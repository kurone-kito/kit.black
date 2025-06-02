import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  webServer: {
    command: 'pnpm --filter "*web-solid" run dev',
    port: 3000,
    reuseExistingServer: !process.env['CI'],
  },
});
