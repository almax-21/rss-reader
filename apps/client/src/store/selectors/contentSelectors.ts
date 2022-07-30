import { createSelector } from 'reselect';

import type { Post } from '@/models/Post';
import { SORTS } from '@/types';

import type { RootState } from '../types';
import { POST_STATES } from '../types';

export const selectFeeds = (state: RootState) => {
	const feeds = state.feeds.ids.map((id) => state.feeds.entities[id]);

	return feeds;
};

export const selectActiveFeedId = (state: RootState) =>
	state.feeds.activeFeedId;

export const selectPostEntities = (state: RootState) => state.posts.byFeedId;

export const selectUnreadPostsCount = createSelector(
	[selectActiveFeedId, selectPostEntities],
	(activeFeedId, postEntities) => {
		const filteredPosts = postEntities[activeFeedId].filter(
			({ state }) => state === POST_STATES.UNREAD,
		);

		return filteredPosts.length;
	},
);

export const selectUnreadPostsCountDynamically = (postsByFeedId: Post[]) => {
	const filteredPosts = postsByFeedId.filter(
		({ state }) => state === POST_STATES.UNREAD,
	);

	return filteredPosts.length;
};

export const selectFeedsWithCounter = createSelector(
	[selectFeeds, selectPostEntities],
	(feeds, postEntities) => {
		const feedsWithCounter = feeds.map((feed) => ({
			...feed,
			unreadPostsCount: selectUnreadPostsCountDynamically(
				postEntities[feed._id],
			),
		}));

		return feedsWithCounter;
	},
);

export const selectPostFilter = (state: RootState) => state.posts.filter;

export const selectFilteredPosts = createSelector(
	[selectActiveFeedId, selectPostFilter, selectPostEntities],
	(activeFeedId, filter, postEntities) => {
		if (!activeFeedId) {
			return [];
		}

		const posts = postEntities[activeFeedId];

		const searchedPosts = posts.filter((post) =>
			post.title.toLowerCase().includes(filter.query.toLowerCase()),
		);

		const sortedPosts =
			filter.sortType === SORTS.OLD_FIRST
				? searchedPosts.reverse()
				: searchedPosts;

		if (filter.state === POST_STATES.ALL) {
			return sortedPosts;
		}

		const filteredPosts = sortedPosts.filter(
			(post) => post.state === filter.state,
		);

		return filteredPosts;
	},
);
