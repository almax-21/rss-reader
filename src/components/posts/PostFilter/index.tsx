import React, { FC, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';

import useTypedDispatch from '../../../hooks/redux/useTypedDispatch';
import { MESSAGES } from '../../../i18n/types';
import {
	switchFilterState,
	updateFilterQuery,
} from '../../../store/slices/rssSlice';
import { POST_STATES, POST_TYPE } from '../../../store/types';
import { IPostFilter } from '../../../types';
import MyDropDown from '../../UI/MyDropDown';

import './style.scss';

interface PostFilterProps {
	postFilter: IPostFilter;
	resetActivePage: () => void;
}

const PostFilter: FC<PostFilterProps> = ({ postFilter, resetActivePage }) => {
	const [searchQuery, setSearchQuery] = useState<string>('');

	const filterValues = Object.values(POST_STATES);

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

	return (
		<div className="filter">
			<Form onSubmit={handleSubmit}>
				<InputGroup className="filter__group">
					<Form.Control
						type="text"
						value={searchQuery}
						onChange={handleChangeQuery}
						className="filter__input"
						placeholder={intl.formatMessage({ id: MESSAGES.SEARCH }) + '...'}
						aria-label={intl.formatMessage({ id: MESSAGES.SEARCH })}
					/>
					{searchQuery ? (
						<Button className="filter__btn" variant="primary" type="submit">
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

			<MyDropDown
				variant="outline-secondary"
				title={intl.formatMessage({ id: postFilter.state })}
				values={filterValues}
				activeValue={postFilter.state}
				handleSetActiveValue={handleSwitchFilterState}
			/>
		</div>
	);
};

export default PostFilter;
