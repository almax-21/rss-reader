import React from 'react';
import { render } from '@testing-library/react';

import { SvgIcon } from './SvgIcon';

it('should render default variant', () => {
	const { container } = render(<SvgIcon />);

	expect(container).toMatchSnapshot();
});
