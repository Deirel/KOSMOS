const path = require("path");
const TsConfigPathsWebpackPlugin = require("tsconfig-paths-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlagin = require("copy-webpack-plugin");

const isDev = process.env.NODE_ENV;
module.exports = {
    entry: "./src/index.ts",
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: [/node_modules/, "/src/scripts/util/helper.ts"],
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                    filename: "[name].bundle.js",
                },
            },
        },
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        modules: ["node_modules", "src"],
        plugins: [new TsConfigPathsWebpackPlugin({})],
    },

    output: {
        path: path.resolve(__dirname, "../bundle"),
        filename: "[name].bundle.[contenthash].js",
        chunkFilename: "[name].chunk.[contenthash].js",
        clean: true,
    },

    externals: {
        tslib: "tslib",
        anime: "anime",
    },

    plugins: [
        new HTMLWebpackPlugin({
            name: "TEST",
            title: "KOSMOS",
        }),
        new CopyWebpackPlagin({
            patterns: [{ from: "src/assets", to: "assets" }],
        }),
    ],
};
