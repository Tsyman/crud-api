const path = require("path");

module.exports = () => {
  return {
    entry: "./src/index.ts",
    target: "node",

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "server.js",
    },

    resolve: {
      extensions: [".ts", ".js"],
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: "ts-loader",
          },
        },
      ],
    },
  };
};