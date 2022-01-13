import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';

import useTypedDispatch from '../../../hooks/redux/useTypedDispatch';
import useTypedSelector from '../../../hooks/redux/useTypedSelector';
import { MESSAGES } from '../../../i18n/types';
import setAllActivePostsRead from '../../../store/async-actions/setAllActivePostsRead';
import {
	selectActiveFeedId,
	selectUnreadPostsCount,
} from '../../../store/selectors/contentSelectors';
import {
	switchFilterState,
	switchSortType,
	updateFilterQuery,
} from '../../../store/slices/postsSlice';
import { POST_STATE_TYPE, POST_STATES } from '../../../store/types';
import { IPostFilter, SORT_TYPE } from '../../../types';
import { debounce } from '../../../utils/perfomance';
import FilterSort from '../../UI/FilterSort';
import MyDropDown from '../../UI/MyDropDown';
import MyModal from '../../UI/MyModal/index';
import { MODAL_TYPES } from '../../UI/MyModal/types';

import './style.scss';

interface PostFilterProps {
	postFilter: IPostFilter;
	resetActivePage: () => void;
}

const PostFilter: FC<PostFilterProps> = ({ postFilter, resetActivePage }) => {
	const [isShowModal, setIsShowModal] = useState<boolean>(false);

	const filterValues = Object.values(POST_STATES);

	const activeFeedId = useTypedSelector(selectActiveFeedId);
	const unreadPostsCount = useTypedSelector(selectUnreadPostsCount);

	const dispatch = useTypedDispatch();
	const intl = useIntl();

	const searchRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (searchRef.current) {
			const input = searchRef.current;
			input.value = '';
		}
	}, [activeFeedId]);

	const handleSearch = debounce((evt: ChangeEvent<HTMLInputElement>) => {
		const { value } = evt.target;

		dispatch(updateFilterQuery(value));

		resetActivePage();
	}, 300);

	const handleSwitchSortType = (newType: SORT_TYPE) => () => {
		if (newType === postFilter.sort) {
			return;
		}

		dispatch(switchSortType(newType));
	};

	const handleSwitchFilterState = (value: POST_STATE_TYPE) => () => {
		if (value === postFilter.state) {
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
			<div className="filter">
				<InputGroup className="filter__group">
					<Form.Control
						ref={searchRef}
						aria-label={intl.formatMessage({ id: MESSAGES.SEARCH })}
						className="filter__input"
						placeholder={intl.formatMessage({ id: MESSAGES.SEARCH }) + '...'}
						type="text"
						onChange={handleSearch}
					/>
				</InputGroup>

				<div className="d-flex flex-wrap justify-content-between flex-grow-1">
					<MyDropDown
						activeValue={postFilter.state}
						handleSetActiveValue={handleSwitchFilterState}
						title={intl.formatMessage({ id: postFilter.state })}
						values={filterValues}
						variant="outline-secondary"
					/>
					<FilterSort
						activeSortType={postFilter.sort}
						classes="filter__sort"
						sortHandler={handleSwitchSortType}
					/>
					<Button
						className="filter__btn filter__btn--mark-all"
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

export default PostFilter;
