import { createSelector } from 'reselect';

import { RootState, RssState } from '../types';

const getRssState = (state: RootState) => state.rss;

const getPostsCount = (rss: RssState, feedId: string) =>
	rss.postsByFeedId[feedId].filter(({ isRead }) => !isRead).length;

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
		posts: rss.activeFeedId ? rss.postsByFeedId[rss.activeFeedId] : [],
		activeFeedId: rss.activeFeedId,
	})
);

export const selectUrls = createSelector(
	(state: RootState) => state.rss,
	(rss: RssState) => ({
		isLoading: rss.isLoading,
		urls: rss.urlDataColl.map(({ url }) => url),
	})
);
