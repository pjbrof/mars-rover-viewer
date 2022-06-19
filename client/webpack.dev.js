const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: path.join(__dirname, "public"),
    compress: true,
    port: 8080,
    hot: true,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
