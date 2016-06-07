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
      },
      {
        test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader : 'file-loader'
      }
    ]
  },
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    './src/sass/indexed-cloudinary.scss',
    './demo/demo.js'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    })
  ]
}
