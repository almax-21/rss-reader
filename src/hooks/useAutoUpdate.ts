import { useEffect, useRef } from 'react';
import _ from 'lodash';
import { AnyAction } from 'redux';

import updatePostsData from '../store/async-actions/updatePostsData';
import { FeedUrlData } from '../types';

import useTypedDispatch from './redux/useTypedDispatch';

const useAutoUpdate = (urlDataset: FeedUrlData[], timeMs: number): void => {
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

					checkForUpdate(urlData, timeMs);
				});
			}, timeMs);
		};

		const newUrlDataset = _.pullAllBy(
			urlDataset.slice(),
			prevUrlDatasetRef.current,
			'feedId'
		);

		newUrlDataset.forEach((urlData) => {
			checkForUpdate(urlData, timeMs);
		});

		prevUrlDatasetRef.current = urlDataset;
	}, [urlDataset]);
};

export default useAutoUpdate;
