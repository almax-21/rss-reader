import React, { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import useTypedSelector from '../../hooks/redux/useTypedSelector';
import usePaginator from '../../hooks/usePaginator';
import { MESSAGES } from '../../i18n/types';
import { selectFeedsAndPosts } from '../../store/selectors/index';
import { showCurrentItems } from '../../utils/page';
import FeedList from '../feeds/FeedList';
import Paginator from '../Paginator/index';
import PostList from '../posts/PostList';

const POSTS_LIMIT = 20;

const ContentContainer: FC = () => {
	const { feeds, allPosts } = useTypedSelector(selectFeedsAndPosts);

	const { totalPages, activePage, setActivePage } = usePaginator(
		allPosts,
		POSTS_LIMIT
	);

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
										totalPages={totalPages}
										activePage={activePage}
										setActivePage={setActivePage}
									/>
									<PostList posts={currentPosts} />
									{currentPosts.length > 10 && (
										<Paginator
											totalPages={totalPages}
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
