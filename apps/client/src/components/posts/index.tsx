import React, { FC, useEffect, useMemo, useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import useTypedDispatch from '../../hooks/redux/useTypedDispatch';
import useTypedSelector from '../../hooks/redux/useTypedSelector';
import usePaginator from '../../hooks/usePaginator';
import { MESSAGES } from '../../i18n/types';
import {
	selectActiveFeedId,
	selectFilter,
	selectFilteredPosts,
} from '../../store/selectors/contentSelectors';
import { updateFilterQuery } from '../../store/slices/postsSlice';
import { showCurrentItems } from '../../utils/page';
import Paginator from '../UI/Paginator/index';

import PostFilter from './PostFilter/index';
import PostList from './PostList';

const POSTS_LIMIT = 20;
const MIN_POSTS_COUNT = 10;

const PostContent: FC = () => {
	const posts = useTypedSelector(selectFilteredPosts);
	const activeFeedId = useTypedSelector(selectActiveFeedId);

	const postFilter = useTypedSelector(selectFilter);
	const dispatch = useTypedDispatch();

	const { totalPages, activePage, setActivePage } = usePaginator(
		posts,
		POSTS_LIMIT
	);

	const prevActiveFeedId = useRef<string>('');

	const resetActivePage = () => {
		if (activePage === 1) {
			return;
		}

		setActivePage(1);
	};

	useEffect(() => {
		// new feed was selected
		if (activeFeedId !== prevActiveFeedId?.current) {
			dispatch(updateFilterQuery(''));
			resetActivePage();
		}

		prevActiveFeedId.current = activeFeedId;
	}, [activeFeedId]);

	const currentPosts = useMemo(
		() => showCurrentItems(posts, activePage, POSTS_LIMIT),
		[posts, activePage, POSTS_LIMIT]
	);

	return (
		<div>
			<h2 className="h3 mb-4">
				<FormattedMessage id={MESSAGES.POSTS} />
			</h2>
			<PostFilter postFilter={postFilter} resetActivePage={resetActivePage} />
			<Paginator
				activePage={activePage}
				setActivePage={setActivePage}
				totalPages={totalPages}
			/>
			{currentPosts.length === 0 ? (
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
		</div>
	);
};

export default PostContent;
