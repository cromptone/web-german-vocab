var webpack = require('webpack');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
	template: __dirname + '/src/index.html',
	filename: 'index.html',
	inject: 'body'
});

module.exports = {
	devtool: 'source-map',
	entry: __dirname + '/src/index.js',
	module: {
		loaders: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
                presets: ["es2015"]
            }
		}
		]
	},
	output: {
		filename: 'transformed.js',
		path: __dirname + '/dist'
	},
	plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, 
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false,
      },
      exclude: [/\.min\.js$/gi]
    })
  ],
};

