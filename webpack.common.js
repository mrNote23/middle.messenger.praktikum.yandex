/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {
    index: "./index.ts",
  },
  resolve: {
    extensions: [".ts", ".js", ".png"],
  },
  plugins: [
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
