const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        app: './src/App.jsx',
        vendor: ['react', 'react-dom', 'whatwg-fetch'],
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
            // filename: "vendor.js"
            // (Give the chunk a different name)

            minChunks: Infinity,
            // (with more entries, this ensures that no other module
            //  goes into the vendor chunk)
        })
    ],
    module: {
        loaders: [{
            test: /\.jsx$/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']
            }
        }, ]
    },
    devServer: {
        port: 8000,
        contentBase: 'static',
        proxy: {
            '/api/*': {
                target: 'http://localhost:8080'
            }
        }
    }
};