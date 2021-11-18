import React, { FC } from 'react';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import useTypedDispatch from '../hooks/useTypedDispatch';
import localeSlice from '../store/reducers/localeSlice';
import { useIntl } from 'react-intl';
import { LocaleType, MESSAGES } from '../i18n/types';
import { LOCALES } from '../i18n/locales';

const LocaleSwitcher: FC = () => {
	const { setLocale } = localeSlice.actions;
	const dispatch = useTypedDispatch();

	const intl = useIntl();

	const localeHandler = (value: string | null) => {
		dispatch(setLocale(value as LocaleType));
	};

	return (
		<DropdownButton
			as={ButtonGroup}
			onSelect={localeHandler}
			title={intl.formatMessage({ id: MESSAGES.LANGUAGE })}
		>
			<Dropdown.Item eventKey={LOCALES.RUSSIAN}>
				{LOCALES.RUSSIAN}
			</Dropdown.Item>
			<Dropdown.Item eventKey={LOCALES.ENGLISH}>
				{LOCALES.ENGLISH}
			</Dropdown.Item>
		</DropdownButton>
	);
};

export default LocaleSwitcher;
