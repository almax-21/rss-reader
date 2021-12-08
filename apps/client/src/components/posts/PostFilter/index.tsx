import React, {
	ChangeEvent,
	FC,
	FormEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
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
import { debounce } from '../../../utils/perfomance';
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

	const formRef = useRef<HTMLFormElement | null>(null);

	useEffect(() => {
		formRef.current?.reset();
	}, [activeFeedId]);

	const handleSearch = debounce((evt: ChangeEvent<HTMLInputElement>) => {
		const { value } = evt.target;

		dispatch(updateFilterQuery(value));
	}, 300);

	const handleReset = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		formRef.current?.reset();

		dispatch(updateFilterQuery(''));
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
				<Form ref={formRef} onSubmit={handleReset}>
					<InputGroup className="filter__group">
						<Form.Control
							aria-label={intl.formatMessage({ id: MESSAGES.SEARCH })}
							className="filter__input"
							placeholder={intl.formatMessage({ id: MESSAGES.SEARCH }) + '...'}
							type="text"
							onChange={handleSearch}
						/>
						<Button
							className="filter__btn"
							type="submit"
							variant="outline-info"
						>
							<FormattedMessage id={MESSAGES.RESET} />
						</Button>
					</InputGroup>
				</Form>

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
