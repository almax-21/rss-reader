import { createSelector } from 'reselect';

import { RootState, RssState } from '../types';

export const selectRSS = (state: RootState) => state.rss;

export const selectUrls = createSelector(selectRSS, (rss: RssState) => ({
	isLoading: rss.isLoading,
	urls: rss.urlDataset.map(({ url }) => url),
}));
