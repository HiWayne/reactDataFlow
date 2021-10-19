const path = require("path");

const {
  override,
  addDecoratorsLegacy,
  addWebpackAlias,
  addPostcssPlugins,
  addWebpackResolve,
  addWebpackModuleRule,
} = require("customize-cra");
module.exports = override(
  addDecoratorsLegacy(),
  addWebpackAlias({
    api: path.resolve(__dirname, "./src/api"),
    mobxStore: path.resolve(__dirname, "./src/store/mobxStore"),
    reduxStore: path.resolve(__dirname, "./src/store/reduxStore"),
    reduxToolkitStore: path.resolve(__dirname, "./src/store/reduxToolkitStore"),
    recoilStore: path.resolve(__dirname, "./src/store/recoilStore"),
    components: path.resolve(__dirname, "./src/components"),
    pages: path.resolve(__dirname, "./src/pages"),
    router: path.resolve(__dirname, "./src/router"),
    assets: path.resolve(__dirname, "./src/assets"),
    utils: path.resolve(__dirname, "./src/shared/utils"),
    styles: path.resolve(__dirname, "./src/shared/styles"),
  }),
  addWebpackResolve({
    extensions: [
      ".js",
      ".ts",
      "jsx",
      "tsx",
      ".json",
      ".wasm",
      ".css",
      ".less",
      ".sass",
      ".scss",
      ".styl",
    ],
  }),
  addPostcssPlugins([require("tailwindcss"), require("autoprefixer")]),
  addWebpackModuleRule({ test: /\.png$/, use: "url-loader" })
);
