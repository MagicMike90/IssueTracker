const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    app: ['./src/index.jsx'],
    vendor: ['react', 'react-dom', 'whatwg-fetch', 'react-router-dom', 'react-bootstrap', 'react-router-bootstrap'],
  },
  output: {
    path: path.resolve(__dirname, "static"),
    // filename: "[name].js"
    filename: 'app.bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.bundle.js",
      minChunks: Infinity
      // (with more entries, this ensures that no other module goes into the vendor chunk)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }, ]
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  devServer: {
    hot: true,
    port: 8000,
    contentBase: 'static',
    proxy: {
      '/api': 'http://localhost:8080'
    },
    historyApiFallback: true
  },
  devtool: 'source-map',
  watchOptions: {
    poll: true
  }
};
