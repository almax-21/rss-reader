/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

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
		new webpack.ProgressPlugin(),
		new CleanWebpackPlugin(),
		new CopyPlugin({
			patterns: [
				{ from: 'assets/icons', to: 'icons/' },
				{ from: 'manifest.webmanifest' },
			],
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
		!isDevMode &&
			new InjectManifest({
				swSrc: './sw.ts',
				swDest: 'sw.js',
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
		new BundleAnalyzerPlugin({
			analyzerMode: 'disabled',
			generateStatsFile: true,
			statsOptions: { source: false },
		}),
	].filter(Boolean),
	devServer: {
		port: 3000,
		hot: isDevMode,
		historyApiFallback: true,
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
