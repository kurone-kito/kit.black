const convPaths = require('convert-tsconfig-paths-to-webpack-aliases').default;

// Needs to be valid JSON. All comments in tsconfig.json must be removed.
const tsconfig = require('./tsconfig.json');

const aliases = convPaths(tsconfig);

// Consumable std. Webpack Export
module.exports = { resolve: { alias: aliases } };
