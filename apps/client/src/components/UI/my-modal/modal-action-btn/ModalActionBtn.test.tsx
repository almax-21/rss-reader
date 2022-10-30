import type { ComponentType } from 'react';
import React from 'react';
import { compose } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import withIntl from '@/hocs/withIntl';
import withStateProvider from '@/hocs/withStateProvider';
import rssMetaReducer from '@/store/slices/rssMetaSlice';

import { MODAL_TYPES } from '../types';

import type { ModalActionBtnProps } from './ModalActionBtn';
import { ModalActionBtn } from './ModalActionBtn';

const URL = 'https://kek.wut';

it('should render preview button with link', () => {
	renderComponent({ type: MODAL_TYPES.PREVIEW, url: URL });

	expect(screen.getByRole('link')).toHaveAttribute('href', URL);
});

it('should not render preview button without link', () => {
	renderComponent({ type: MODAL_TYPES.PREVIEW });

	expect(screen.queryByRole('link')).not.toBeInTheDocument();
});

it('should render disabled delete button with loader', () => {
	renderComponent(
		{ type: MODAL_TYPES.DELETE },
		{ rssMeta: { isFeedDeleteInProcess: true } },
	);

	expect(screen.getByRole('button')).toHaveAttribute('disabled');
	expect(document.querySelector('.spinner')).toBeInTheDocument();
});

it('should call handleAction on click', async () => {
	const handleAction = jest.fn();

	renderComponent({ type: MODAL_TYPES.MARK, handleAction });

	await userEvent.click(screen.getByRole('button'));
	expect(handleAction).toHaveBeenCalledTimes(1);
});

function renderComponent(
	props = {} as ModalActionBtnProps,
	preloadedState = {},
) {
	const ModalActionBtnSmart = compose<ComponentType<ModalActionBtnProps>>(
		withStateProvider({ rssMeta: rssMetaReducer }, preloadedState),
		withIntl,
	)(ModalActionBtn);

	return render(<ModalActionBtnSmart {...props} />);
}
