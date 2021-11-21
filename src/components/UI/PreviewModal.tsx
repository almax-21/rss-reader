import React, { FC } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { MESSAGES } from '../../i18n/types';

interface PreviewModalProps {
	isShow: boolean;
	onClose: () => void;
	title: string;
	description: string;
	url: string;
}

const PreviewModal: FC<PreviewModalProps> = ({
	isShow,
	onClose: handleClose,
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
				<a
					className="btn btn-primary"
					href={url}
					target="_blank"
					rel="noreferrer"
				>
					<FormattedMessage id={MESSAGES.READ_MORE} />
				</a>
				<Button variant="secondary" onClick={handleClose}>
					<FormattedMessage id={MESSAGES.CLOSE} />
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default PreviewModal;
