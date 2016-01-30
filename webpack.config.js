var webpack = require('webpack');

module.exports = {
	entry: {
		'main': './tests.js',
	},
	output: {
		path: '.',
		filename: 'tests.bundle.js',
		sourceMapFilename: 'tests.bundle.js.map'
	},
	devtool: [ 'source-map' ],
	resolve: {
		extensions: ['', '.js']
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader'
			}
		]
	}
};
