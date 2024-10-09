import type { StorybookConfig } from 'storybook-solidjs-vite';

export default {
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: { name: 'storybook-solidjs-vite', options: {} },
  staticDirs: ['../public'],
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
} satisfies StorybookConfig;
