import React from 'react';
import { render } from '@testing-library/react';

import withIntl from '@/hocs/withIntl';

import type { MySpinnerProps } from './MySpinner';
import { MySpinner } from './MySpinner';

it('should render with ARIA-attributes', () => {
	const MySpinnerSmart = withIntl<MySpinnerProps>(MySpinner);

	render(<MySpinnerSmart isDark small />);

	const spinnerEl = document.querySelector('.spinner');

	expect(spinnerEl).toHaveAttribute('role', 'status');
	expect(spinnerEl).toHaveAttribute('aria-hidden', 'true');
});
