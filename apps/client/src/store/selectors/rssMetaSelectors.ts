import { createSelector } from 'reselect';

import type { RootState, RssState } from '../types';

export const selectRssMeta = (state: RootState) => state.rssMeta;

export const selectUrls = createSelector(selectRssMeta, (rssMeta: RssState) =>
	rssMeta.urlDataset.map(({ url }) => url)
);
