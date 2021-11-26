import { createSelector } from 'reselect';

import { POST_STATES, RootState, RssState } from '../types';

export const selectRSS = (state: RootState) => state.rss;

export const selectUnreadPostsCount = (rss: RssState, feedId: string) => {
	const posts = rss.posts.byFeedId[feedId];
	const filteredPosts = posts.filter(
		({ state }) => state === POST_STATES.UNREAD
	);

	return filteredPosts.length;
};

export const selectFeeds = (state: RootState) => {
	const feeds = state.rss.feeds.ids.map((id) => state.rss.feeds.entities[id]);

	return feeds;
};

export const selectActiveFeedId = (state: RootState) =>
	state.rss.feeds.activeFeedId;

export const selectFeedsWithCounter = (rss: RssState) => {
	const feeds = rss.feeds.ids.map((id) => rss.feeds.entities[id]);

	const feedsWithCounter = feeds.map((feed) => ({
		...feed,
		unreadPostsCount: selectUnreadPostsCount(rss, feed.id),
	}));

	return feedsWithCounter;
};

export const selectFilteredPosts = (rss: RssState) => {
	const activeFeedId = rss.feeds.activeFeedId;

	if (!activeFeedId) {
		return [];
	}

	const filter = rss.posts.filter;

	const posts = rss.posts.byFeedId[activeFeedId];
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

export const selectFilter = (state: RootState) => state.rss.posts.filter;

export const selectFeedsAndPosts = createSelector(
	selectRSS,
	(rss: RssState) => ({
		feeds: selectFeedsWithCounter(rss),
		posts: selectFilteredPosts(rss),
		activeFeedId: rss.feeds.activeFeedId,
	})
);

export const selectUrls = createSelector(selectRSS, (rss: RssState) => ({
	isLoading: rss.isLoading,
	urls: rss.urlDataColl.map(({ url }) => url),
}));
