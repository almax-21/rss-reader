import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import useTypedSelector from '../../../hooks/redux/useTypedSelector';
import { MESSAGES } from '../../../i18n/types';
import { selectRssMeta } from '../../../store/selectors/rssMetaSelectors';
import MySpinner from '../MySpinner';

import { MODAL_TYPES, ModalActionBtnProps } from './types';

const ModalActionBtn: FC<ModalActionBtnProps> = ({
	type,
	handleAction,
	url,
}) => {
	const { isFeedDeleteInProcess, isFeedReloadInProcess } =
		useTypedSelector(selectRssMeta);

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
		case MODAL_TYPES.MARK: {
			return (
				<Button variant="danger" onClick={handleAction}>
					<FormattedMessage id={MESSAGES.MARK} />
				</Button>
			);
		}
		case MODAL_TYPES.DELETE: {
			return (
				<Button
					disabled={isFeedDeleteInProcess}
					variant="danger"
					onClick={handleAction}
				>
					{isFeedDeleteInProcess ? (
						<MySpinner small />
					) : (
						<FormattedMessage id={MESSAGES.DELETE} />
					)}
				</Button>
			);
		}
		case MODAL_TYPES.RELOAD: {
			return (
				<Button
					disabled={isFeedReloadInProcess}
					variant="primary"
					onClick={handleAction}
				>
					{isFeedReloadInProcess ? (
						<MySpinner small />
					) : (
						<FormattedMessage id={MESSAGES.RELOAD} />
					)}
				</Button>
			);
		}
	}
};

export default ModalActionBtn;
