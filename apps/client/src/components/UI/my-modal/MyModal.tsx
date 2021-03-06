import type { FC } from 'react';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';

import { useTypedSelector } from '@/hooks';
import { MESSAGES } from '@/i18n/types';
import { selectSettings } from '@/store/selectors/settingsSelectors';

import { ModalActionBtn } from './modal-action-btn';
import type { MyModalProps } from './types';

import styles from './styles.module.scss';

export const MyModal: FC<MyModalProps> = ({
	type,
	isShow,
	handleClose,
	handleAction,
	title,
	description,
	url,
	imgSrc,
}) => {
	const { isDarkTheme } = useTypedSelector(selectSettings);
	const isTouchDevice = window.matchMedia('(hover: none)').matches;

	const intl = useIntl();

	return (
		<Modal
			centered={isTouchDevice}
			role="alert"
			show={isShow}
			onHide={handleClose}
		>
			<Modal.Header
				closeButton
				closeLabel={intl.formatMessage({ id: MESSAGES.CLOSE_MODAL })}
				closeVariant={isDarkTheme ? 'white' : undefined}
			>
				<Modal.Title>
					<h3 className="h4">{title}</h3>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{imgSrc && (
					<div className={styles['modal__image-wrapper']}>
						<img
							alt={intl.formatMessage({ id: MESSAGES.CONTENT_IMAGE })}
							src={imgSrc}
						/>
					</div>
				)}
				<p className={styles['modal__description']}>{description}</p>
			</Modal.Body>
			<Modal.Footer>
				<ModalActionBtn handleAction={handleAction} type={type} url={url} />
				<Button variant="secondary" onClick={handleClose}>
					<FormattedMessage id={MESSAGES.CLOSE} />
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
