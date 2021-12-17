import React, { FC } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import useTypedSelector from '../../../hooks/redux/useTypedSelector';
import { MESSAGES } from '../../../i18n/types';
import { selectSettings } from '../../../store/selectors/settingsSelectors';

import ModalActionBtn from './ModalActionBtn';
import { MyModalProps } from './types';

import './style.scss';

const MyModal: FC<MyModalProps> = ({
	type,
	isShow,
	handleClose,
	handleAction,
	title,
	description,
	url,
}) => {
	const { isDarkTheme } = useTypedSelector(selectSettings);

	return (
		<Modal
			centered={window.matchMedia('(hover: none)').matches}
			show={isShow}
			onHide={handleClose}
		>
			<Modal.Header
				closeButton
				closeVariant={isDarkTheme ? 'white' : undefined}
			>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{description}</Modal.Body>
			<Modal.Footer>
				<ModalActionBtn handleAction={handleAction} type={type} url={url} />
				<Button variant="secondary" onClick={handleClose}>
					<FormattedMessage id={MESSAGES.CLOSE} />
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default MyModal;
