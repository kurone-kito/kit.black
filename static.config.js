import ExtractTextPlugin from 'extract-text-webpack-plugin';
import fetch from 'node-fetch';
import path from 'path';
import React from 'react';

import Root from './src/templates/Root';

import TypescriptWebpackPaths from './webpack.config.js';

export default {
  Document: ({ Body, children, Head, Html }) => <Root {...{ Body, Head, Html }}>{children}</Root>,
  entry: path.join(__dirname, 'src', 'index.tsx'),
  getRoutes: async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();

    return [
      { component: 'src/pages/Home', path: '/' },
      { component: 'src/pages/404', is404: true },
    ];
  },
  getSiteData: () => ({ title: 'Kurone Kito (黒音キト)' }),
  webpack: (config, { defaultLoaders, stage }) => {
    const loaders = (() => {
      const defaultCssSettings = {
        loader: 'css-loader',
        options: { importLoaders: 1, minimize: stage === 'prod', sourceMap: false },
      };
      const defaultSassSettings = { loader: 'sass-loader', options: { includePath: ['src/'] } };
      if (stage === 'dev') {
        return ['style-loader', 'css-loader', 'sass-loader'].map((loader) => ({ loader }));
      }

      return ExtractTextPlugin.extract({
        fallback: { loader: 'style-loader', options: { sourceMap: false, hmr: false } },
        use: [defaultCssSettings, defaultSassSettings],
      });
    })();

    // Add .ts and .tsx extension to resolver
    config.resolve.extensions.push('.ts', '.tsx');

    // Add TypeScript Path Mappings (from tsconfig via webpack.config.js)
    // To react-statics alias resolution
    config.resolve.alias = TypescriptWebpackPaths.resolve.alias;

    // We replace the existing JS rule with one, that allows us to use
    // Both TypeScript and JavaScript interchangeably
    config.module.rules = [
      {
        oneOf: [
          {
            exclude: defaultLoaders.jsLoader.exclude, // As std jsLoader exclude
            test: /\.(js|jsx|ts|tsx)$/,
            use: [
              { loader: 'babel-loader' },
              { loader: require.resolve('ts-loader'), options: { transpileOnly: true } },
            ],
          },
          { test: /\.s(a|c)ss$/, use: loaders },
          { test: /favicon\.ico$/, loader: 'file-loader?name=[name].[ext]' },
          defaultLoaders.cssLoader,
          defaultLoaders.jsLoader,
          defaultLoaders.fileLoader,
        ],
      },
    ];
    // FIXME: You might need to make the file name universal
    config.plugins.push(new ExtractTextPlugin('app.scss'));

    return config;
  },
};
