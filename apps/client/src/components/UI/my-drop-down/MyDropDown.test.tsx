import type { ComponentType } from 'react';
import React from 'react';
import { compose } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import withIntl from '@/hocs/withIntl';
import withStateProvider from '@/hocs/withStateProvider';
import settingsReducer from '@/store/slices/settingsSlice';
import type { POST_STATE_TYPE } from '@/store/types';
import { POST_STATES } from '@/store/types';

import type { MyDropDownProps } from './MyDropDown';
import { MyDropDown } from './MyDropDown';

it('should toggle drop-down on click', async () => {
	const MyDropDownSmart = compose<
		ComponentType<MyDropDownProps<POST_STATE_TYPE>>
	>(
		withStateProvider({ settings: settingsReducer }),
		withIntl,
	)(MyDropDown);

	const values = Object.values(POST_STATES);

	const { container } = render(
		<MyDropDownSmart
			activeValue={POST_STATES.ALL}
			title={'LOL'}
			values={values}
			variant="outline-secondary"
			onItemClick={jest.fn()}
		/>,
	);

	expect(container).toMatchSnapshot();

	const toggleEl = screen.getByRole('button', { name: 'LOL', expanded: false });
	await userEvent.click(toggleEl);

	expect(container).toMatchSnapshot();
});
