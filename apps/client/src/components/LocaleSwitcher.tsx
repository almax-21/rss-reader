import React, { FC } from 'react';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import useTypedSelector from '../hooks/redux/useTypedSelector';
import { LOCALES } from '../i18n/locales';
import { LocaleType, MESSAGES } from '../i18n/types';
import userAPI from '../services/UserService';
import { selectLang } from '../store/selectors/langSelectors';
import { selectUser } from '../store/selectors/userSelectors';

import MySpinner from './UI/MySpinner';

interface LocaleSwitcherProps {
	classes: string;
}

const LocaleSwitcher: FC<LocaleSwitcherProps> = ({ classes }) => {
	const { isAuth } = useTypedSelector(selectUser);
	const { isSwitchLangInProcess, lang: currentLang } =
		useTypedSelector(selectLang);

	const [switchLang] = userAPI.useSwitchLangMutation();

	if (!isAuth) {
		return null;
	}

	const localeHandler = (value: string | null) => {
		if (value === currentLang) {
			return;
		}

		if (value) {
			const newLang = value as LocaleType;

			switchLang(newLang);
		}
	};

	return (
		<DropdownButton
			as={ButtonGroup}
			className={classes}
			disabled={isSwitchLangInProcess}
			size="sm"
			title={
				isSwitchLangInProcess ? (
					<MySpinner size="sm" />
				) : (
					<FormattedMessage id={MESSAGES.LANGUAGE} />
				)
			}
			onSelect={localeHandler}
		>
			<Dropdown.Item eventKey={LOCALES.RUSSIAN}>
				<FormattedMessage id={MESSAGES.RUSSIAN} />
			</Dropdown.Item>
			<Dropdown.Item eventKey={LOCALES.ENGLISH}>
				<FormattedMessage id={MESSAGES.ENGLISH} />
			</Dropdown.Item>
		</DropdownButton>
	);
};

export default LocaleSwitcher;
