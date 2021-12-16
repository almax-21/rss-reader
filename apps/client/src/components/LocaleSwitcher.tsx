import React, { FC } from 'react';
import { Accordion, ListGroup } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import useTypedSelector from '../hooks/redux/useTypedSelector';
import { LOCALES } from '../i18n/locales';
import { LocaleType, MESSAGES } from '../i18n/types';
import userAPI from '../services/UserService';
import { selectLang } from '../store/selectors/langSelectors';
import { selectUser } from '../store/selectors/userSelectors';

import MySpinner from './UI/MySpinner';
import SvgIcon from './UI/SvgIcon';
import { SVG_ICON_VARIANTS } from './UI/SvgIcon/types';

const LocaleSwitcher: FC = () => {
	const { isAuth } = useTypedSelector(selectUser);
	const { isSwitchLangInProcess, lang: currentLang } =
		useTypedSelector(selectLang);

	const [switchLang] = userAPI.useSwitchLangMutation();
	const langEntries = Object.entries(LOCALES);

	if (!isAuth) {
		return null;
	}

	const handleSwitchLocale = (value: LocaleType) => () => {
		if (value === currentLang) {
			return;
		}

		if (value) {
			const newLang = value as LocaleType;

			switchLang(newLang);
		}
	};

	return (
		<Accordion flush>
			<Accordion.Item eventKey="0">
				<Accordion.Header>
					<SvgIcon height="18" variant={SVG_ICON_VARIANTS.LANG} width="18" />
					<span className="menu-item__text">
						<FormattedMessage id={MESSAGES.LANGUAGE} />
					</span>
					{isSwitchLangInProcess && <MySpinner size="sm" />}
				</Accordion.Header>
				<Accordion.Body className="p-2">
					<ListGroup variant="flush">
						{langEntries.map(([langKey, langValue]) => (
							<ListGroup.Item
								key={langKey}
								action
								active={currentLang === langValue}
								className="list-item"
								onClick={handleSwitchLocale(langValue)}
							>
								<FormattedMessage id={langKey} />
							</ListGroup.Item>
						))}
					</ListGroup>
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	);
};

export default LocaleSwitcher;
