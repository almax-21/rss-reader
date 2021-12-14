import { useEffect, useRef } from 'react';
import { AnyAction } from 'redux';

import updatePostsData from '../store/async-actions/updatePostsData';
import { FeedUrlData } from '../types';
import { getDiffBy } from '../utils/collection';

import useTypedDispatch from './redux/useTypedDispatch';

const UPDATE_PERIOD_MS = 60000;

const useAutoUpdate = (urlDataset: FeedUrlData[]): void => {
	const dispatch = useTypedDispatch();

	const prevUrlDatasetRef = useRef<FeedUrlData[]>([]);

	useEffect(() => {
		if (urlDataset.length === 0) {
			prevUrlDatasetRef.current = [];

			return;
		}

		const checkForUpdate = (urlData: FeedUrlData, timeMs: number) => {
			setTimeout(() => {
				dispatch(updatePostsData(urlData)).then((action: AnyAction) => {
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
	}, [urlDataset]);
};

export default useAutoUpdate;
