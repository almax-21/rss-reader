/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isDevMode = process.env.NODE_ENV === 'development';

const setupOptimizationConfig = () => {
	const config = {
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
		},
		minimizer: [new CssMinimizerPlugin()],
	};

	if (!isDevMode) {
		config.minimizer = [...config.minimizer, new TerserPlugin()];
	}

	return config;
};

/** @type {import('webpack').Configuration} */
module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		main: './index',
	},
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'build'),
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
	optimization: setupOptimizationConfig(),
	plugins: [
		new HtmlPlugin({
			template: './index.html',
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
		new ForkTsCheckerWebpackPlugin({
			async: false,
			typescript: {
				configFile: path.resolve(__dirname, 'tsconfig.json'),
			},
		}),
		new ESLintPlugin({
			extensions: ['js', 'jsx', 'ts', 'tsx'],
		}),
	],
	devServer: {
		port: 3000,
		hot: isDevMode,
		client: {
			overlay: false,
		},
	},
	stats: 'errors-only',
	devtool: isDevMode ? 'source-map' : false,
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/i,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /.s?css$/,
				use: [
					isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
				use: 'file-loader',
			},
		],
	},
};
