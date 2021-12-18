import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import { useIntl } from 'react-intl';

import { MESSAGES } from '../../i18n/types';

interface DnDBtnProps {
	setAncestorDraggable: () => void;
}

const DnDBtn: FC<DnDBtnProps> = ({ setAncestorDraggable }) => {
	const intl = useIntl();

	return (
		<Button
			className="p-0"
			size="sm"
			style={{ cursor: 'grab' }}
			title={intl.formatMessage({ id: MESSAGES.CHOOSE_FEED })}
			variant="light"
			onPointerDown={setAncestorDraggable}
		>
			<svg
				aria-hidden="true"
				className="octicon octicon-grabber"
				data-view-component="true"
				height="24"
				version="1.1"
				viewBox="0 0 16 16"
				width="24"
			>
				<path
					d="M10 13a1 1 0 100-2 1 1 0 000 2zm-4 0a1 1 0 100-2 1 1 0 000 2zm1-5a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2zm1-5a1 1 0 11-2 0 1 1 0 012 0zM6 5a1 1 0 100-2 1 1 0 000 2z"
					fillRule="evenodd"
				></path>
			</svg>
		</Button>
	);
};

export default DnDBtn;
