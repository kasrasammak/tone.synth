const webpack = require('webpack');
const path = require('path');


const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');



const config = {
	context: path.resolve(__dirname, 'src'),
	entry: {
		app	 : ['./js/application.js']
	},

	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js',
		publicPath: '/'
	},

	devtool: 'source-map',

	plugins : [
		new WebpackNotifierPlugin(),
		new ExtractTextPlugin({filename:'[name].css', allChunks: true}),
		new HtmlWebpackPlugin({
			title : 'tone.synth',
			template: './templates/index.html',
			filename: 'index.html',
			inject:'body'
		}),
	],

	module : {
		rules :	[
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
        use: ExtractTextPlugin.extract({
          use: 'css-loader',
        })
			}
		]
	},



	resolve: {
		modules: [
			path.resolve(__dirname, 'src'),
			path.resolve(__dirname, 'src/js'),
			path.resolve(__dirname, 'node_modules')
		],
		extensions: ['.js', '.json', '.scss', '.css']
	}
}

module.exports = config;