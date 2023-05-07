/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const { merge } = require("webpack-merge");

const common = require("./webpack.common");
const envs = { development: "dev", production: "prod" };
const env = envs[process.env.NODE_ENV || "development"];
const envConfig = require(`./webpack.${env}.js`);

module.exports = merge(common, envConfig);
