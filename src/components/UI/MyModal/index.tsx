import React, { FC } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { MESSAGES } from '../../../i18n/types';

import ModalActionBtn from './ModalActionBtn';
import { MyModalProps } from './types';

const MyModal: FC<MyModalProps> = ({
	type,
	isShow,
	handleClose,
	handleAction,
	title,
	description,
	url,
}) => {
	return (
		<Modal show={isShow} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{description}</Modal.Body>
			<Modal.Footer>
				<ModalActionBtn type={type} handleAction={handleAction} url={url} />
				<Button variant="secondary" onClick={handleClose}>
					<FormattedMessage id={MESSAGES.CLOSE} />
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default MyModal;
