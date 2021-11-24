import { createSelector } from 'reselect';

import { RootState, RssState } from '../types';

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

export const selectFeedsAndPosts = createSelector(
	getRssState,
	(rss: RssState) => ({
		feeds: getFeeds(rss),
		allPosts: rss.allPosts,
	})
);

export const selectUrls = createSelector(
	(state: RootState) => state.rss,
	(rss: RssState) => ({
		isLoading: rss.isLoading,
		urls: rss.urlDataColl.map(({ url }) => url),
	})
);
