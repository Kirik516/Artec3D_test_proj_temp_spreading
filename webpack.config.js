const HtmlPlugin = require('html-webpack-plugin');

module.exports = {

  entry: {
    bundle: ["./src/index.js"]
  },

  plugins: [
    new HtmlPlugin({
      filename: 'index.html'
    })
  ],

  module: {
    rules: [
      {
        test: /.(ply|json|png|jpg)$/,
        include: /models/,
        type: "javascript/auto",
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]"
          }
        }
      }
    ]
  }

}