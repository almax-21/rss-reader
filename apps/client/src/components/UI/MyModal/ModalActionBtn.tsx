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
			return url ? (
				<a
					className="btn btn-primary"
					href={url}
					rel="noreferrer"
					target="_blank"
				>
					<FormattedMessage id={MESSAGES.READ_MORE} />
				</a>
			) : null;
		}
		case MODAL_TYPES.DELETE: {
			return (
				<Button variant="danger" onClick={handleAction}>
					<FormattedMessage id={MESSAGES.DELETE} />
				</Button>
			);
		}
		case MODAL_TYPES.MARK: {
			return (
				<Button variant="danger" onClick={handleAction}>
					<FormattedMessage id={MESSAGES.MARK} />
				</Button>
			);
		}
	}
};

export default ModalActionBtn;
