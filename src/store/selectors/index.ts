import { createSelector } from 'reselect';

import { POST_STATES, RootState, RssState } from '../types';

export const selectRSS = (state: RootState) => state.rss;

export const selectUnreadPostsCount = (state: RootState, feedId: string) => {
	const posts = state.posts.byFeedId[feedId];
	const filteredPosts = posts.filter(
		({ state }) => state === POST_STATES.UNREAD
	);

	return filteredPosts.length;
};

export const selectFeeds = (state: RootState) => {
	const feeds = state.feeds.ids.map((id) => state.feeds.entities[id]);

	return feeds;
};

export const selectActiveFeedId = (state: RootState) =>
	state.feeds.activeFeedId;

export const selectFeedsWithCounter = (state: RootState) => {
	const feeds = state.feeds.ids.map((id) => state.feeds.entities[id]);

	const feedsWithCounter = feeds.map((feed) => ({
		...feed,
		unreadPostsCount: selectUnreadPostsCount(state, feed.id),
	}));

	return feedsWithCounter;
};

export const selectFilteredPosts = (state: RootState) => {
	const activeFeedId = state.feeds.activeFeedId;

	if (!activeFeedId) {
		return [];
	}

	const filter = state.posts.filter;

	const posts = state.posts.byFeedId[activeFeedId];
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
};

export const selectFilter = (state: RootState) => state.posts.filter;

export const selectFeedsAndPosts = (state: RootState) => ({
	feeds: selectFeedsWithCounter(state),
	posts: selectFilteredPosts(state),
	activeFeedId: state.feeds.activeFeedId,
});

export const selectUrls = createSelector(selectRSS, (rss: RssState) => ({
	isLoading: rss.isLoading,
	urls: rss.urlDataset.map(({ url }) => url),
}));
