import ExtractTextPlugin from 'extract-text-webpack-plugin';
import fetch from 'node-fetch';
import path from 'path';

import TypescriptWebpackPaths from './webpack.config.js';

export default {
  entry: path.join(__dirname, 'src', 'index.tsx'),
  getRoutes: async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();

    return [
      { component: 'src/containers/Home', path: '/' },
      { component: 'src/containers/About', path: '/about' },
      {
        children: posts.map((post) => ({
          component: 'src/containers/Post',
          getData: () => ({ post }),
          path: `/post/${post.id}`,
        })),
        component: 'src/containers/Blog',
        getData: () => ({ posts }),
        path: '/blog',
      },
      { component: 'src/containers/404', is404: true },
    ];
  },
  getSiteData: () => ({ title: 'React Static' }),
  webpack: (config, { defaultLoaders }) => {
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
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
          },
          defaultLoaders.fileLoader,
        ],
      },
    ];
    // FIXME: You might need to make the file name universal
    config.plugins.push(new ExtractTextPlugin('app.css'));

    return config;
  },
};
