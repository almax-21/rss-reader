import type { ComponentType } from 'react';
import React from 'react';
import { compose } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';

import withIntl from '@/hocs/withIntl';
import withStateProvider from '@/hocs/withStateProvider';
import settingsReducer from '@/store/slices/settingsSlice';

import type { PaginatorProps } from './Paginator';
import { Paginator } from './Paginator';

it('should not render paginator', () => {
	const { container } = renderComponent({ totalPages: 1 });

	expect(container.firstChild).toBe(null);
});

it('should be disabled "Previous" arrow', () => {
	renderComponent({ totalPages: 5, activePage: 1 });

	expect(document.querySelectorAll('.page-link')[0]).toHaveAttribute(
		'disabled',
	);
});

it('should be disabled "Next" arrow', () => {
	renderComponent({ totalPages: 5, activePage: 5 });

	const pageLinks = document.querySelectorAll('.page-link');

	expect(pageLinks[pageLinks.length - 1]).toHaveAttribute('disabled');
});

function renderComponent({
	totalPages = 3,
	activePage = 1,
	onClick = () => jest.fn(),
}: Partial<PaginatorProps>) {
	const SimplePaginationSmart = compose<ComponentType<PaginatorProps>>(
		withStateProvider({ settings: settingsReducer }),
		withIntl,
	)(Paginator);

	return render(
		<SimplePaginationSmart
			activePage={activePage}
			totalPages={totalPages}
			onClick={onClick}
		/>,
	);
}
