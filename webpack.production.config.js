
const webpack = require('webpack'),
    path = require('path'),
    fs = require('fs')

const SRC = path.resolve(__dirname, "src"),
    NODE_MODULES = path.resolve(__dirname, "node_modules")


const config = {
    entry: __dirname + '/src/index.js',
    module: {
        loaders: [
            {
                test: /\.js?$/,
                include: SRC,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: { 
                    presets: ['react', 'env'],
                 }
            },
        ]
    },

    output: {
        path: path.resolve(__dirname, 'public', 'assets'),
        publicPath: '/assets',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true
            }
        })
    ]
};

module.exports = config