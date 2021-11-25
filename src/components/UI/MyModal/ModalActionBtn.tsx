import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { MESSAGES } from '../../../i18n/types';

import { MODAL_TYPES, ModalActionBtnProps } from './types';

const ModalActionBtn: FC<ModalActionBtnProps> = ({
	type,
	handleAction,
	url,
}) => {
	switch (type) {
		case MODAL_TYPES.PREVIEW: {
			return (
				<a
					className="btn btn-primary"
					href={url}
					target="_blank"
					rel="noreferrer"
				>
					<FormattedMessage id={MESSAGES.READ_MORE} />
				</a>
			);
		}
		case MODAL_TYPES.DELETE: {
			return (
				<Button variant="danger" onClick={handleAction}>
					<FormattedMessage id={MESSAGES.DELETE} />
				</Button>
			);
		}
	}
};

export default ModalActionBtn;
