const webpack = require('webpack');
const path = require('path');


const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');


const config = {
	context: path.resolve(__dirname, 'src'),
	entry: {
		app	 : ['./js/application.js']
	},

	output: {
		path: path.resolve(__dirname, 'build'),
		filename: hashFilenames ? '[name].[hash].js' : '[name].js',
		publicPath: '/'
	},

	devtool: 'source-map',

	plugins : [
		new WebpackNotifierPlugin(),
		new ExtractTextPlugin(hashFilenames ? '[name].[hash].css' : '[name].css'),
		new HtmlWebpackPlugin({
			title : 'tone.synth',
			template: './templates/index.html',
			filename: 'index.html',
			inject:'body'
		}),


	],

	loaders : [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}
	],

	resolve: {
		modules: [
			path.resolve(__dirname, 'src'),
			path.resolve(__dirname, 'src/js'),
			path.resolve(__dirname, 'node_modules')
		],
		extensions: ['.js', '.json', '.scss', '.css'],
		alias: {}
	}
}