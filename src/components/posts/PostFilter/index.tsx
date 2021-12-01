import React, { FC, useState } from 'react';
import { Badge, Button, Form, InputGroup } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';

import useTypedDispatch from '../../../hooks/redux/useTypedDispatch';
import useTypedSelector from '../../../hooks/redux/useTypedSelector';
import { MESSAGES } from '../../../i18n/types';
import {
	selectActiveFeedId,
	selectUnreadPostsCount,
} from '../../../store/selectors/contentSelectors';
import {
	setAllActivePostsRead,
	switchFilterState,
	updateFilterQuery,
} from '../../../store/slices/postsSlice';
import { POST_STATES, POST_TYPE } from '../../../store/types';
import { IPostFilter } from '../../../types';
import MyDropDown from '../../UI/MyDropDown';
import MyModal from '../../UI/MyModal/index';
import { MODAL_TYPES } from '../../UI/MyModal/types';

import './style.scss';

interface PostFilterProps {
	postFilter: IPostFilter;
	resetActivePage: () => void;
}

const PostFilter: FC<PostFilterProps> = ({ postFilter, resetActivePage }) => {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [isShowModal, setIsShowModal] = useState<boolean>(false);

	const filterValues = Object.values(POST_STATES);

	const activeFeedId = useTypedSelector(selectActiveFeedId);
	const unreadPostsCount = useTypedSelector(selectUnreadPostsCount);

	const dispatch = useTypedDispatch();

	const intl = useIntl();

	const handleChangeQuery = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(evt.target.value);
	};

	const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		dispatch(updateFilterQuery(searchQuery));

		setSearchQuery('');
		resetActivePage();
	};

	const handleReset = () => {
		dispatch(updateFilterQuery(''));
		setSearchQuery('');
		resetActivePage();
	};

	const handleSwitchFilterState = (value: POST_TYPE) => () => {
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
				<Form onSubmit={handleSubmit}>
					<InputGroup className="filter__group">
						<Form.Control
							aria-label={intl.formatMessage({ id: MESSAGES.SEARCH })}
							className="filter__input"
							placeholder={intl.formatMessage({ id: MESSAGES.SEARCH }) + '...'}
							type="text"
							value={searchQuery}
							onChange={handleChangeQuery}
						/>
						{searchQuery ? (
							<Button className="filter__btn" type="submit" variant="primary">
								<FormattedMessage id={MESSAGES.FIND} />
							</Button>
						) : (
							<Button
								className="filter__btn"
								variant="outline-info"
								onClick={handleReset}
							>
								<FormattedMessage id={MESSAGES.RESET} />
							</Button>
						)}
					</InputGroup>
				</Form>

				<div className="d-flex flex-wrap-reverse">
					<div className="d-flex flex-wrap justify-content-between flex-grow-1">
						<MyDropDown
							activeValue={postFilter.state}
							handleSetActiveValue={handleSwitchFilterState}
							title={intl.formatMessage({ id: postFilter.state })}
							values={filterValues}
							variant="outline-secondary"
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
					{postFilter.query && (
						<Badge pill bg="light" text="dark">
							<FormattedMessage id={MESSAGES.SEARCH_BY_REQUEST} />:{' '}
							{postFilter.query}
						</Badge>
					)}
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
