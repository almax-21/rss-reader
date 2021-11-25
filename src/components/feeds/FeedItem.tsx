import React, { FC, useState } from 'react';
import { Badge, CloseButton, ListGroup } from 'react-bootstrap';
import { useIntl } from 'react-intl';

import useTypedDispatch from '../../hooks/redux/useTypedDispatch';
import { MESSAGES } from '../../i18n/types';
import { deleteFeed } from '../../store/slices/rssSlice';
import { truncateText } from '../../utils/text';
import MyModal from '../MyModal/index';
import { MODAL_TYPES } from '../MyModal/types';

interface FeedItemProps {
	id: string;
	title: string;
	description: string;
	postsCount: number;
}

const FeedItem: FC<FeedItemProps> = ({
	id,
	title,
	description,
	postsCount,
}) => {
	const [isShowModal, setIsShowModal] = useState<boolean>(false);

	const dispatch = useTypedDispatch();
	const intl = useIntl();

	const handleDeleteFeed = (id: string) => () => {
		dispatch(deleteFeed(id));
	};

	const handleOpenModal = () => {
		setIsShowModal(true);
	};

	const handleCloseModal = () => {
		setIsShowModal(false);
	};

	return (
		<ListGroup.Item
			as="li"
			className="d-flex justify-content-between align-items-start"
		>
			<div className="ms-2 me-auto">
				<div className="d-flex align-items-center">
					<h3 className="h5 fw-bold" style={{ marginRight: 5 }}>
						{title}
					</h3>
					<Badge pill bg="danger" className="mb-2">
						{postsCount}
					</Badge>
				</div>
				<span>{truncateText(description)}</span>
			</div>
			{!!postsCount && (
				<div>
					<CloseButton onClick={handleOpenModal} />
				</div>
			)}
			<MyModal
				type={MODAL_TYPES.DELETE}
				isShow={isShowModal}
				handleClose={handleCloseModal}
				handleAction={handleDeleteFeed(id)}
				title={title}
				description={intl.formatMessage({ id: MESSAGES.FEEDS_DELETE_WARNING })}
			/>
		</ListGroup.Item>
	);
};

export default FeedItem;
