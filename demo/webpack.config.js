var webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  output: {
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: [/node_modules/, /web_modules/]
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  entry: [
    './src/sass/indexed-cloudinary.scss',
    './demo/demo.js'
  ],
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
}
