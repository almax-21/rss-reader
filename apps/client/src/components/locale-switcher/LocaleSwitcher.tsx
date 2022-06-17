import React, { FC } from 'react';
import { Accordion, ListGroup } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import cn from 'classnames';

import { MySpinner } from '@/components/UI/my-spinner';
import { SvgIcon } from '@/components/UI/svg-icon';
import { SVG_ICON_VARIANTS } from '@/components/UI/svg-icon/types';
import { useTypedSelector } from '@/hooks';
import { LOCALES } from '@/i18n/locales';
import { LocaleType, MESSAGES } from '@/i18n/types';
import userAPI from '@/services/UserService';
import { selectSettings } from '@/store/selectors/settingsSelectors';
import { selectAuthState } from '@/store/selectors/userSelectors';

import styles from './styles.module.scss';

export const LocaleSwitcher: FC = () => {
	const isAuth = useTypedSelector(selectAuthState);

	const { isSwitchLangInProcess, lang: currentLang } =
		useTypedSelector(selectSettings);

	const { isDarkTheme } = useTypedSelector(selectSettings);

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
		<Accordion flush className={styles['locale-switcher']}>
			<Accordion.Item eventKey="0">
				<Accordion.Header className={styles['locale-switcher__header']}>
					<SvgIcon height="18" variant={SVG_ICON_VARIANTS.LANG} width="18" />
					<span className="menu-item__text">
						<FormattedMessage id={MESSAGES.LANGUAGE} />
					</span>
					{isSwitchLangInProcess && (
						<MySpinner small isDark={isDarkTheme ? false : true} />
					)}
				</Accordion.Header>
				<Accordion.Body className={cn(styles['locale-switcher__body'], 'p-2')}>
					<ListGroup variant="flush">
						{langEntries.map(([langKey, langValue]) => {
							const isActive = currentLang === langValue;

							return (
								<ListGroup.Item
									key={langKey}
									action
									active={isActive}
									as="button"
									className="list-item"
									onClick={handleSwitchLocale(langValue)}
								>
									<FormattedMessage id={langKey} />
									{isActive && (
										<span className="visually-hidden">
											<FormattedMessage id={MESSAGES.ACTIVE} />
										</span>
									)}
								</ListGroup.Item>
							);
						})}
					</ListGroup>
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	);
};
