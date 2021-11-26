import React, { FC, useEffect, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import useTypedDispatch from '../../hooks/redux/useTypedDispatch';
import useTypedSelector from '../../hooks/redux/useTypedSelector';
import usePaginator from '../../hooks/usePaginator';
import { MESSAGES } from '../../i18n/types';
import { selectFeedsAndPosts, selectFilter } from '../../store/selectors/rss';
import { updateFilterQuery } from '../../store/slices/rssSlice';
import { showCurrentItems } from '../../utils/page';
import FeedList from '../feeds/FeedList';
import PostFilter from '../posts/PostFilter';
import PostList from '../posts/PostList';
import Paginator from '../UI/Paginator/index';

const POSTS_LIMIT = 20;
const MIN_POSTS_COUNT = 10;

const ContentContainer: FC = () => {
	const { feeds, posts, activeFeedId } = useTypedSelector(selectFeedsAndPosts);

	const postFilter = useTypedSelector(selectFilter);
	const dispatch = useTypedDispatch();

	const { totalPages, activePage, setActivePage } = usePaginator(
		posts,
		POSTS_LIMIT
	);

	const prevActiveFeedId = useRef<string | null>(null);

	const resetActivePage = () => {
		setActivePage(1);
	};

	useEffect(() => {
		if (activeFeedId !== prevActiveFeedId?.current) {
			dispatch(updateFilterQuery(''));
			resetActivePage();
		}

		prevActiveFeedId.current = activeFeedId;
	}, [activeFeedId]);

	if (feeds.length === 0) {
		return (
			<Container fluid className="container-xxl p-5">
				<Row className="flex-wrap-reverse">
					<h2 className="display-5 text-center">
						<FormattedMessage id={MESSAGES.NO_FEEDS} />
					</h2>
				</Row>
			</Container>
		);
	}

	const currentPosts = showCurrentItems(posts, activePage, POSTS_LIMIT);

	return (
		<Container fluid className="container-xxl p-5">
			<Row className="flex-wrap-reverse">
				<Col as="section" className="mb-5">
					<>
						<h2 className="h3 mb-4">
							<FormattedMessage id={MESSAGES.POSTS} />
						</h2>
						<PostFilter
							postFilter={postFilter}
							resetActivePage={resetActivePage}
						/>
						<Paginator
							activePage={activePage}
							setActivePage={setActivePage}
							totalPages={totalPages}
						/>
						{posts.length === 0 ? (
							<h3 className="h4 mt-4">
								<FormattedMessage id={MESSAGES.NOT_FOUND} />
							</h3>
						) : (
							<PostList posts={currentPosts} />
						)}
						{currentPosts.length > MIN_POSTS_COUNT && (
							<Paginator
								activePage={activePage}
								setActivePage={setActivePage}
								totalPages={totalPages}
							/>
						)}
					</>
				</Col>
				<Col as="section" className="mb-5">
					<h2 className="h3 mb-4">
						<FormattedMessage id={MESSAGES.FEEDS} />
					</h2>
					<FeedList feeds={feeds} />
				</Col>
			</Row>
		</Container>
	);
};

export default ContentContainer;
