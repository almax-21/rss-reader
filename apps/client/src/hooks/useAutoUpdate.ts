import { useEffect, useRef } from 'react';
import { AnyAction } from 'redux';

import updateFeedsData from '../store/async-actions/updateFeedsData';
import { FeedUrlData } from '../types';
import { getDiffBy } from '../utils/collection';

import useTypedDispatch from './redux/useTypedDispatch';

const UPDATE_PERIOD_MS = 180000;

const useAutoUpdate = (
	urlDataset: FeedUrlData[],
	isAutoUpdate: boolean
): void => {
	const dispatch = useTypedDispatch();

	const prevUrlDatasetRef = useRef<FeedUrlData[]>([]);

	useEffect(() => {
		if (!isAutoUpdate || urlDataset.length === 0) {
			prevUrlDatasetRef.current = [];

			return;
		}

		const checkForUpdate = (urlData: FeedUrlData, timeMs: number) => {
			setTimeout(() => {
				dispatch(updateFeedsData(urlData)).then((action: AnyAction) => {
					const needToCancel = action?.meta?.condition ?? false;

					if (needToCancel) {
						return;
					}

					checkForUpdate(urlData, UPDATE_PERIOD_MS);
				});
			}, timeMs);
		};

		const newUrlDataset = getDiffBy(
			urlDataset,
			prevUrlDatasetRef.current,
			'feedId'
		);

		newUrlDataset.forEach((urlData) => {
			checkForUpdate(urlData, 0);
		});

		prevUrlDatasetRef.current = urlDataset;
	}, [isAutoUpdate, urlDataset]);
};

export default useAutoUpdate;
