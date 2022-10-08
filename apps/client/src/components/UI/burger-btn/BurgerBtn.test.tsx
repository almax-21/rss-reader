import React from 'react';
import { IntlProvider } from 'react-intl';
import { render, screen } from '@testing-library/react';

import { messages } from '@/i18n/messages';

import { BurgerBtn } from './BurgerBtn';

it('должен отрендерить компонент', () => {
	const lang = 'ru';

	render(
		<IntlProvider locale={lang} messages={messages[lang]}>
			<BurgerBtn isActive onClick={() => 'kek'} />
		</IntlProvider>,
	);

	expect(screen.getByRole('button')).toBeInTheDocument();
});
