const webpack = require('webpack');
module.exports = {
    entry: {
        app: './src/App.jsx',
        vendor: ['react', 'react-dom', 'whatwg-fetch'],
    },
    output: {
        path: '/static',
        filename: "[name].js"
        // filename: 'app.bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name:'vendor', filename:'vendor.bundle.js'})
    ],
    module: {
        loaders: [{
            test: /\.jsx$/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']
            }
        }, ]
    }
};
