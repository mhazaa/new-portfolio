const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'production',

	resolve: {
		extensions: ['.js', 'jsx', '.ts', '.tsx'],
	},

	entry: './src/index.tsx',

	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'script.js',
	},

	performance: {
		hints: false,
	},

	devServer: {
		static: path.resolve(__dirname, 'build'),
		port: 3000,
		historyApiFallback: {
			index: 'index.html',
		},
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
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
				}
			},
		],
	},

	plugins: [
		new MiniCSSExtractPlugin({
			filename: 'style.css',
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			favicon: './src/assets/favicon.svg',
		}),
	],
};