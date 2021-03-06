const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = (env) => {
  const common = {
    entry: "./src/index.js",
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "React application",
        template: "./src/index.html",
      }),
      ...(env.WEBPACK_SERVE ? [new ReactRefreshWebpackPlugin()] : []),
    ],
    module: {
      rules: [
        {
          test: /\.[tj]sx?$/,
          exclude: /node_modules/,
          resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
          },
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-typescript",
                ["@babel/preset-react", { runtime: "automatic" }],
                "@babel/preset-env",
              ],
              plugins: [
                ...(env.WEBPACK_SERVE
                  ? [require.resolve("react-refresh/babel")]
                  : []),
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  };
  const dev = {
    ...common,
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
      static: "./dist",
      hot: true,
    },
  };
  const prod = {
    ...common,
    mode: "production",
    optimization: {
      moduleIds: "deterministic",
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /\/node_modules\//,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
  };
  return env.WEBPACK_SERVE ? dev : prod;
};
