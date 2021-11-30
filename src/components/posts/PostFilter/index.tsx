import React, { FC, useState } from 'react';
import { Badge, Button, Form, InputGroup } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';

import useTypedDispatch from '../../../hooks/redux/useTypedDispatch';
import { MESSAGES } from '../../../i18n/types';
import {
	switchFilterState,
	updateFilterQuery,
} from '../../../store/slices/postsSlice';
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
				<MyDropDown
					activeValue={postFilter.state}
					handleSetActiveValue={handleSwitchFilterState}
					title={intl.formatMessage({ id: postFilter.state })}
					values={filterValues}
					variant="outline-secondary"
				/>
				{postFilter.query && (
					<Badge pill bg="light" text="dark">
						<FormattedMessage id={MESSAGES.SEARCH_BY_REQUEST} />:{' '}
						{postFilter.query}
					</Badge>
				)}
			</div>
		</div>
	);
};

export default PostFilter;
