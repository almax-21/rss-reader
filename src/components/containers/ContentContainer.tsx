import React, { FC, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { createSelector } from 'reselect';

import useTypedSelector from '../../hooks/redux/useTypedSelector';
import { MESSAGES } from '../../i18n/types';
import { RootState, RssState } from '../../store/types';
import { getPagesCount, showCurrentItems } from '../../utils/page';
import FeedList from '../feeds/FeedList';
import Paginator from '../Paginator/index';
import PostList from '../posts/PostList';

const getRssState = (state: RootState) => state.rss;

const getPostsCount = (rss: RssState, feedId: string) =>
	rss.allPosts
		.filter((post) => post.feedId === feedId)
		.filter(({ isRead }) => !isRead).length;

const getFeeds = (rss: RssState) =>
	rss.feeds.ids
		.map((id) => rss.feeds.entities[id])
		.map((feed) => ({
			...feed,
			postsCount: getPostsCount(rss, feed.id),
		}));

const selectDataLists = createSelector(getRssState, (rss: RssState) => ({
	feeds: getFeeds(rss),
	allPosts: rss.allPosts,
}));

const POSTS_LIMIT = 20;

const ContentContainer: FC = () => {
	const [totalPostPages, setTotalPostPages] = useState<number>(0);
	const [activePage, setActivePage] = useState<number>(1);

	const { feeds, allPosts } = useTypedSelector(selectDataLists);

	useEffect(() => {
		const postsCount = allPosts.length;
		const newPagesCount = getPagesCount(postsCount, POSTS_LIMIT);

		setTotalPostPages(newPagesCount);
	}, [allPosts]);

	const currentPosts = showCurrentItems(allPosts, activePage, POSTS_LIMIT);

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
							{allPosts.length && (
								<>
									<h2 className="h3 mb-4">
										<FormattedMessage id={MESSAGES.POSTS} />
									</h2>
									<Paginator
										totalPages={totalPostPages}
										activePage={activePage}
										setActivePage={setActivePage}
									/>
									<PostList posts={currentPosts} />
									{currentPosts.length > 10 && (
										<Paginator
											totalPages={totalPostPages}
											activePage={activePage}
											setActivePage={setActivePage}
										/>
									)}
								</>
							)}
						</Col>
						<Col as="section" className="mb-5">
							<h2 className="h3 mb-4">
								<FormattedMessage id={MESSAGES.FEEDS} />
							</h2>
							<FeedList feeds={feeds} />
						</Col>
					</>
				)}
			</Row>
		</Container>
	);
};

export default ContentContainer;
