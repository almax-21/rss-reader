import React, { FC, useEffect, useMemo, useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import { Paginator } from '@/components/UI/paginator';
import { usePaginator, useTypedDispatch, useTypedSelector } from '@/hooks';
import { MESSAGES } from '@/i18n/types';
import { Post } from '@/models/Post';
import {
	selectActiveFeedId,
	selectFilteredPosts,
} from '@/store/selectors/contentSelectors';
import { updateFilterQuery } from '@/store/slices/postsSlice';
import { showCurrentItems } from '@/utils/page';

import { PostFilter } from './post-filter';
import { PostList } from './post-list';

const POSTS_LIMIT = 20;
const MIN_POSTS_COUNT = 10;

export const PostContent: FC = () => {
	const posts = useTypedSelector(selectFilteredPosts);
	const activeFeedId = useTypedSelector(selectActiveFeedId);

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
		() => showCurrentItems<Post>(posts, activePage, POSTS_LIMIT),
		[posts, activePage, POSTS_LIMIT]
	);

	return (
		<div>
			<h2 className="h3 mb-4">
				<FormattedMessage id={MESSAGES.POSTS} />
			</h2>
			<PostFilter resetActivePage={resetActivePage} />
			<Paginator
				activePage={activePage}
				setActivePage={setActivePage}
				totalPages={totalPages}
			/>
			{currentPosts.length === 0 ? (
				<h3 aria-live="assertive" className="h4 mt-4">
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
