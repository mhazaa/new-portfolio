const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: process.env.NODE_ENV || 'development',

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},

	entry: './src/index.tsx',

	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'script.js',
	},

	performance: {
		hints: false,
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: { onlyCompileBundledFiles: true },
					},
				],
				exclude: /node_modules/,
			},
			{
				test: /\.s?css$/,
				use: [MiniCSSExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpe?g|gif|svg|pdf)$/,
				use: {
					loader: 'file-loader',
					options: {
						outputPath: 'assets/imgs',
					},
				},
			},
		],
	},

	plugins: [
		new MiniCSSExtractPlugin({
			filename: 'style.css',
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			publicPath: '/',
			favicon: './src/assets/favicon.svg',
		}),
	],
};