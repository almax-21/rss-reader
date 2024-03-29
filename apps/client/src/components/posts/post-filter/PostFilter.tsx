import type { FC } from 'react';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import cn from 'classnames';

import { MyDropDown } from '@/components/UI/my-drop-down';
import { MyModal } from '@/components/UI/my-modal';
import { MODAL_TYPES } from '@/components/UI/my-modal/types';
import { useTypedDispatch, useTypedSelector } from '@/hooks';
import { MESSAGES } from '@/i18n/types';
import { setAllActivePostsRead } from '@/store/async-actions';
import {
	selectActiveFeedId,
	selectPostFilter,
	selectUnreadPostsCount,
} from '@/store/selectors/contentSelectors';
import { switchFilterState, switchSortType } from '@/store/slices/postsSlice';
import type { POST_STATE_TYPE } from '@/store/types';
import { POST_STATES } from '@/store/types';
import type { SORT_TYPE } from '@/types';

import { FilterSearch } from './filter-search';
import { FilterSort } from './filter-sort';
import type { PostFilterProps } from './types';

import styles from './styles.module.scss';

export const PostFilter: FC<PostFilterProps> = ({ resetActivePage }) => {
	const [isShowModal, setIsShowModal] = useState<boolean>(false);

	const filterValues = Object.values(POST_STATES);

	const { state: filterState, sortType } = useTypedSelector(selectPostFilter);
	const activeFeedId = useTypedSelector(selectActiveFeedId);
	const unreadPostsCount = useTypedSelector(selectUnreadPostsCount);

	const dispatch = useTypedDispatch();
	const intl = useIntl();

	const handleSwitchSortType = (newType: SORT_TYPE) => () => {
		if (newType === sortType) {
			return;
		}

		dispatch(switchSortType(newType));
	};

	const handleSwitchFilterState = (value: POST_STATE_TYPE) => () => {
		if (value === filterState) {
			return;
		}

		dispatch(switchFilterState(value));

		resetActivePage();
	};

	const handleOpenModal = () => {
		setIsShowModal(true);
	};

	const handleCloseModal = () => {
		setIsShowModal(false);
	};

	const handleMarkAllRead = (activeFeedId: string) => () => {
		dispatch(setAllActivePostsRead(activeFeedId));

		setIsShowModal(false);
	};

	return (
		<>
			<FilterSearch resetActivePage={resetActivePage} />
			<div className={styles.filter}>
				<div className="d-flex flex-wrap justify-content-between flex-grow-1">
					<MyDropDown
						activeValue={filterState}
						handleSetActiveValue={handleSwitchFilterState}
						title={intl.formatMessage({ id: filterState })}
						values={filterValues}
						variant="outline-secondary"
					/>
					<FilterSort
						activeSortType={sortType}
						classes={styles.filter__sort}
						sortHandler={handleSwitchSortType}
					/>
					<Button
						className={cn(styles.filter__btn, styles['filter__btn--mark-all'])}
						disabled={unreadPostsCount === 0}
						variant="outline-danger"
						onClick={handleOpenModal}
					>
						<FormattedMessage id={MESSAGES.MARK_ALL_AS_READ} />
					</Button>
				</div>
			</div>

			<MyModal
				description={intl.formatMessage({ id: MESSAGES.MARK_ALL_READ_WARNING })}
				handleAction={handleMarkAllRead(activeFeedId)}
				handleClose={handleCloseModal}
				isShow={isShowModal}
				title={intl.formatMessage({ id: MESSAGES.POSTS })}
				type={MODAL_TYPES.MARK}
			/>
		</>
	);
};
