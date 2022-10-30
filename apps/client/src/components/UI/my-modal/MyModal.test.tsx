import type { ComponentType } from 'react';
import React from 'react';
import { compose } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import withIntl from '@/hocs/withIntl';
import withStateProvider from '@/hocs/withStateProvider';
import rssMetaReducer from '@/store/slices/rssMetaSlice';
import settingsReducer from '@/store/slices/settingsSlice';

import type { MyModalProps } from './MyModal';
import { MyModal } from './MyModal';
import { MODAL_TYPES } from './types';

const setMatchMediaMock = (matches?: boolean) =>
	jest.fn().mockReturnValue({ matches });

beforeEach(() => {
	global.window.matchMedia = setMatchMediaMock();
});

it('should not render modal if prop isShow = false', () => {
	renderComponent({ isShow: false });

	expect(screen.queryByRole('dialog')).toBe(null);
});

it('should center modal on layout if isTouchDevice', () => {
	global.window.matchMedia = setMatchMediaMock(true);

	renderComponent({ isShow: true });

	expect(document.querySelector('.modal-dialog-centered')).toBeInTheDocument();
});

it('should call handleClose on click', async () => {
	const handleClose = jest.fn();

	renderComponent({ isShow: true, handleClose });

	await userEvent.click(screen.getByRole('button', { name: 'Close' }));
	await userEvent.click(
		screen.getByRole('button', { name: 'Close modal window' }),
	);

	const modalBackropEl = document.querySelector('.modal-backdrop') as Element;
	await userEvent.click(modalBackropEl);

	expect(handleClose).toHaveBeenCalledTimes(3);
});

function renderComponent(
	props: Partial<MyModalProps> = {},
	preloadedState = {},
) {
	const MyModalSmart = compose<ComponentType<MyModalProps>>(
		withStateProvider(
			{
				rssMeta: rssMetaReducer,
				settings: settingsReducer,
			},
			preloadedState,
		),
		withIntl,
	)(MyModal);

	return render(
		<MyModalSmart
			description="wut lol"
			handleClose={jest.fn()}
			title="Kek"
			type={MODAL_TYPES.PREVIEW}
			{...props}
		/>,
	);
}
