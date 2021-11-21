import React, { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import useTypedSelector from '../hooks/redux/useTypedSelector';
import { MESSAGES } from '../i18n/types';
import { RootState, RssState } from '../store/types';
import FeedList from './FeedList';
import PostList from './PostList';
import { createSelector } from 'reselect';

const selectDataLists = createSelector(
	(state: RootState) => state.rss,
	(rss: RssState) => ({
		posts: rss.posts,
		feeds: rss.allIds.map((id) => ({
			...rss.feeds[id],
			postsCount: rss.posts.filter((post) => post.feedId === id).length,
		})),
	})
);

const ContentContainer: FC = () => {
	const { feeds, posts } = useTypedSelector(selectDataLists);

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
							{posts.length && <PostList posts={posts} />}
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
