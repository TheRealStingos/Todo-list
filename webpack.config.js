// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/index.js",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
      // Set the public path for GitHub Pages
      publicPath: isProduction ? '/Todo-list/' : '/',
    },
    devtool: isProduction ? "source-map" : "eval-source-map",
    devServer: {
      watchFiles: ["./src/template.html"],
      hot: true,
      open: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/template.html",
        favicon: false, // Add a favicon later if you want
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  };
};