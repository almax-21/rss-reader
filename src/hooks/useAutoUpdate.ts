import { useEffect } from 'react';
import { AnyAction } from 'redux';

import updatePostsData from '../store/async-actions/updatePostsData';
import { FeedUrlData } from '../types';

import useTypedDispatch from './redux/useTypedDispatch';

const useAutoUpdate = (urlDataColl: FeedUrlData[], timeMs: number): void => {
	const dispatch = useTypedDispatch();

	useEffect(() => {
		if (urlDataColl.length === 0) {
			return;
		}

		const checkForUpdate = (
			urlData: FeedUrlData,
			totalUrlCount: number,
			timeMs: number
		) => {
			setTimeout(() => {
        console.log(urlData);
				dispatch(updatePostsData({ urlData, totalUrlCount })).then(
					(action: AnyAction) => {
						const needToCancel = action?.meta?.condition ?? false;

						if (needToCancel) {
							return;
						}

						checkForUpdate(urlData, urlDataColl.length, timeMs);
					}
				);
			}, timeMs);
		};

		urlDataColl.forEach((urlData) => {
			checkForUpdate(urlData, urlDataColl.length, timeMs);
		});
	}, [urlDataColl]);
};

export default useAutoUpdate;
