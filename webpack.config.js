const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TercerPlugin = require("terser-webpack-plugin");
const DotEnd = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const ruleForJavaScript = {
  test: /\.m?js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
  },
};

const ruleForCss = {
  test: /\.css|.styl$/,
  use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
};

const rulesForImages = {
  test: /\.png/,
  type: "asset/resource",
};

const rulesForFonts = {
  test: /\.(woff|woff2|eot|ttf|otf)$/i,
  type: 'asset/resource',
  generator: {
    filename: 'assets/fonts/[hash][ext][query]',  // Directorio de salida
  },
};

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[contenthash].js",
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  resolve: {
    extensions: [".js"],
    alias: {
      '@utils': path.resolve(__dirname, "src/utils/"),
      '@templates': path.resolve(__dirname, "src/templates/"),
      '@styles': path.resolve(__dirname, "src/styles/"),
      '@images': path.resolve(__dirname, "src/assets/images/"),
    }
  },
  module: {
    rules: [ruleForJavaScript, ruleForCss, rulesForImages, rulesForFonts],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css"
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images",
        },
      ],
    }),
    new DotEnd(),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TercerPlugin(),
    ]
  },
};
