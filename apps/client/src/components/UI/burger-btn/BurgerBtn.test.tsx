import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import withIntl from '@/hocs/withIntl';

import type { BurgerBtnProps } from './BurgerBtn';
import { BurgerBtn } from './BurgerBtn';

it('should call onClick', () => {
	const BurgerBtnSmart = withIntl<BurgerBtnProps>(BurgerBtn);
	const onClick = jest.fn();

	render(<BurgerBtnSmart isActive={false} onClick={onClick} />);

	const btn = screen.getByRole('button', { name: 'Settings', expanded: false });
	userEvent.click(btn);

	expect(onClick).toHaveBeenCalledTimes(1);
});
