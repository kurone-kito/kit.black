import type { StorybookConfig } from 'storybook-solidjs-vite';

export default {
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  core: { builder: '@storybook/builder-vite' },
  framework: { name: 'storybook-solidjs-vite', options: {} },
  staticDirs: ['../public'],
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  viteFinal: async (config) => {
    const { mergeConfig } = await import('vite');
    const defaultConfig = await import('../vite.config.mjs');
    return mergeConfig(config, defaultConfig);
  },
} satisfies StorybookConfig;
