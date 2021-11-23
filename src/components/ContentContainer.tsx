import React, { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { createSelector } from 'reselect';

import useTypedSelector from '../hooks/redux/useTypedSelector';
import { MESSAGES } from '../i18n/types';
import { RootState, RssState } from '../store/types';

import FeedList from './FeedList';
import PostList from './PostList';

const getRssState = (state: RootState) => state.rss;

const getPostsCount = (rss: RssState, feedId: string) =>
	rss.allPosts
		.filter((post) => post.feedId === feedId)
		.filter(({ isRead }) => !isRead)
		.length;

const getFeeds = (rss: RssState) =>
	rss.feeds.ids
		.map((id) => rss.feeds.entities[id])
		.map((feed) => ({
			...feed,
			postsCount: getPostsCount(rss, feed.id),
		}));

const selectDataLists = createSelector(
	getRssState,
	(rss: RssState) => ({
		feeds: getFeeds(rss),
		allPosts: rss.allPosts,
	})
);

const ContentContainer: FC = () => {
	const { feeds, allPosts } = useTypedSelector(selectDataLists);

	return (
		<Container fluid className="container-xxl p-5">
			<Row className="flex-wrap-reverse">
				{feeds.length === 0 ? (
					<h2 className="display-5 mt-4 text-center">
						<FormattedMessage id={MESSAGES.NO_FEEDS} />
					</h2>
				) : (
					<>
						<Col as="section" className="mb-5">
							{allPosts.length && <PostList posts={allPosts} />}
						</Col>
						<Col as="section" className="mb-5">
							<FeedList feeds={feeds} />
						</Col>
					</>
				)}
			</Row>
		</Container>
	);
};

export default ContentContainer;
