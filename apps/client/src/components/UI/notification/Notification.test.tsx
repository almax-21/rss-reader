import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Notification } from './Notification';
import { NOTIFICATION_VARIANT } from './types';

it('should render if isShow = true', () => {
	render(
		<Notification
			isShow
			data={{
				variant: NOTIFICATION_VARIANT.SUCCESS,
				message: 'Success',
			}}
			onClose={jest.fn()}
		/>,
	);

	expect(screen.getByText('Success')).toBeInTheDocument();
});

it('should not render if isShow = false', () => {
	render(
		<Notification
			data={{
				variant: NOTIFICATION_VARIANT.SUCCESS,
				message: 'Success',
			}}
			isShow={false}
			onClose={jest.fn()}
		/>,
	);

	expect(screen.queryByText('Success')).toBe(null);
});

it('should call onClose', () => {
	const onClose = jest.fn();

	render(
		<Notification
			isShow
			data={{
				variant: NOTIFICATION_VARIANT.SUCCESS,
				message: 'Success',
			}}
			onClose={onClose}
		/>,
	);

	const closeBtn = screen.getByRole('button');
	userEvent.click(closeBtn);

	expect(onClose).toHaveBeenCalledTimes(1);
});
