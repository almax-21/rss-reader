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

// import React, { FC, useEffect, useRef } from 'react';
// import {
// 	Col,
// 	Container,
// 	Dropdown,
// 	DropdownButton,
// 	FormControl,
// 	InputGroup,
// 	Row,
// } from 'react-bootstrap';
// import { FormattedMessage } from 'react-intl';

// import useTypedSelector from '../../hooks/redux/useTypedSelector';
// import usePaginator from '../../hooks/usePaginator';
// import { MESSAGES } from '../../i18n/types';
// import { selectFeedsAndPosts } from '../../store/selectors/index';
// import { showCurrentItems } from '../../utils/page';
// import FeedList from '../feeds/FeedList';
// import Paginator from '../Paginator/index';
// import PostList from '../posts/PostList';

// const POSTS_LIMIT = 20;

// const ContentContainer: FC = () => {
// 	const { feeds, posts, activeFeedId } = useTypedSelector(selectFeedsAndPosts);

// 	const { totalPages, activePage, setActivePage } = usePaginator(
// 		posts,
// 		POSTS_LIMIT
// 	);

// 	const prevActiveFeedId = useRef<string | null>(null);

// 	useEffect(() => {
// 		if (activeFeedId !== prevActiveFeedId?.current) {
// 			setActivePage(1);
// 		}

// 		prevActiveFeedId.current = activeFeedId;
// 	}, [activeFeedId]);

// 	if (feeds.length === 0) {
// 		return (
// 			<Container fluid className="container-xxl p-5">
// 				<Row className="flex-wrap-reverse">
// 					<h2 className="display-5 mt-4 text-center">
// 						<FormattedMessage id={MESSAGES.NO_FEEDS} />
// 					</h2>
// 				</Row>
// 			</Container>
// 		);
// 	}

// 	const currentPosts = showCurrentItems(posts, activePage, POSTS_LIMIT);

// 	return (
// 		<Container fluid className="container-xxl p-5">
// 			<Row className="flex-wrap-reverse">
// 				<Col as="section" className="mb-5">
// 					{posts.length && (
// 						<>
// 							<h2 className="h3 mb-4">
// 								<FormattedMessage id={MESSAGES.POSTS} />
// 							</h2>
// 							<InputGroup className="mb-3" style={{ maxWidth: '405px' }}>
// 								<FormControl
// 									type="text"
// 									placeholder="Search..."
// 									aria-label="Search posts"
// 								/>

// 								<DropdownButton
// 									variant="outline-secondary"
// 									title="Show"
// 									drop="end"
// 								>
// 									<Dropdown.Item href="#">Read</Dropdown.Item>
// 									<Dropdown.Item href="#">Unread</Dropdown.Item>
// 									<Dropdown.Item active href="#">
// 										All
// 									</Dropdown.Item>
// 								</DropdownButton>
// 							</InputGroup>

// 							<Paginator
// 								totalPages={totalPages}
// 								activePage={activePage}
// 								setActivePage={setActivePage}
// 							/>
// 							<PostList posts={currentPosts} />
// 							{currentPosts.length > 10 && (
// 								<Paginator
// 									totalPages={totalPages}
// 									activePage={activePage}
// 									setActivePage={setActivePage}
// 								/>
// 							)}
// 						</>
// 					)}
// 				</Col>
// 				<Col as="section" className="mb-5">
// 					<h2 className="h3 mb-4">
// 						<FormattedMessage id={MESSAGES.FEEDS} />
// 					</h2>
// 					<FeedList feeds={feeds} />
// 				</Col>
// 			</Row>
// 		</Container>
// 	);
// };

// export default ContentContainer;
