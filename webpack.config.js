/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  devServer: {
    port: 4200,
    static: path.resolve(__dirname, "dist"),
  },
  entry: {
    index: "./index.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.[contenthash].js",
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      chunks: ["index"],
      inject: "body",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "tsconfig.json"),
            },
          },
        ],
      },
      {
        test: /\.(c|sa|sc)ss$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
    ],
  },
};
