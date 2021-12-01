import { createSelector } from 'reselect';

import { IPost } from '../../types';
import { POST_STATES, RootState } from '../types';

export const selectFeedIds = (state: RootState) => state.feeds.ids;

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
		const filteredPosts = postEntities[activeFeedId as string].filter(
			({ state }) => state === POST_STATES.UNREAD
		);

		return filteredPosts.length;
	}
);

export const selectUnreadPostsCountDynamically = (postsByFeedId: IPost[]) => {
	const filteredPosts = postsByFeedId.filter(
		({ state }) => state === POST_STATES.UNREAD
	);

	return filteredPosts.length;
};

export const selectFeedsWithCounter = createSelector(
	[selectFeeds, selectPostEntities],
	(feeds, postEntities) => {
		const feedsWithCounter = feeds.map((feed) => ({
			...feed,
			unreadPostsCount: selectUnreadPostsCountDynamically(postEntities[feed.id]),
		}));

		return feedsWithCounter;
	}
);

export const selectFilter = (state: RootState) => state.posts.filter;

export const selectFilteredPosts = createSelector(
	[selectActiveFeedId, selectFilter, selectPostEntities],
	(activeFeedId, filter, postEntities) => {
		if (!activeFeedId) {
			return [];
		}

		const posts = postEntities[activeFeedId];

		const searchedPosts = posts.filter((post) =>
			post.title.toLowerCase().includes(filter.query.toLowerCase())
		);

		if (filter.state === POST_STATES.ALL) {
			return searchedPosts;
		}

		const filteredPosts = searchedPosts.filter(
			(post) => post.state === filter.state
		);

		return filteredPosts;
	}
);
