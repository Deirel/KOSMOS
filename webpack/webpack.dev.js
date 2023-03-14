const common = require("./webpack.common");
const { InjectManifest } = require("workbox-webpack-plugin");
const { merge } = require("webpack-merge");

const development = {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        open: true,
        port: 8080,
    },
};

module.exports = merge(common, development);
