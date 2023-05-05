/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const modeProd = process.env.MODE_ENV === "production";

module.exports = {
  mode: "development",
  context: path.resolve(__dirname, "src"),
  devtool: modeProd ? false : "eval",
  entry: {
    index: "./index.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[contenthash].js",
  },
  resolve: {
    extensions: [".ts", ".js", ".png"],
  },
  devServer: {
    compress: modeProd,
    port: 3000,
    static: path.resolve(__dirname, "dist"),
  },
  optimization: {
    minimize: modeProd,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      chunks: ["index"],
      inject: "body",
      favicon: "./assets/images/favicon.ico",
      minify: modeProd,
    }),
    new MiniCssExtractPlugin({
      filename: "styles.[contenthash].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "assets/images",
          to: "images",
        },
        {
          from: "../_redirects",
          to: "",
        },
      ],
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
        use: [
          modeProd ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
      {
        test: /\.(jpg|png|svg|ico|.ttf)$/,
        type: "asset/resource",
      },
    ],
  },
};
