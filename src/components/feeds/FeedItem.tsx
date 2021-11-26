import React, { FC, MouseEvent, useState } from 'react';
import { Badge, CloseButton, ListGroup } from 'react-bootstrap';
import { useIntl } from 'react-intl';

import useTypedDispatch from '../../hooks/redux/useTypedDispatch';
import useTypedSelector from '../../hooks/redux/useTypedSelector';
import { MESSAGES } from '../../i18n/types';
import { selectActiveFeedId } from '../../store/selectors/rss';
import { deleteFeed, updateActiveFeed } from '../../store/slices/rssSlice';
import { truncateText } from '../../utils/text';
import MyModal from '../UI/MyModal/index';
import { MODAL_TYPES } from '../UI/MyModal/types';

interface FeedItemProps {
	id: string;
	title: string;
	description: string;
	unreadPostsCount: number;
}

const FeedItem: FC<FeedItemProps> = ({
	id,
	title,
	description,
	unreadPostsCount,
}) => {
	const [isShowModal, setIsShowModal] = useState<boolean>(false);

	const activeFeedId = useTypedSelector(selectActiveFeedId);
	const dispatch = useTypedDispatch();
	const intl = useIntl();

	const isActiveFeed = id === activeFeedId;

	const handleOpenModal = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();

		setIsShowModal(true);
	};

	const handleCloseModal = () => {
		setIsShowModal(false);
	};

	const handleUpdateActiveFeed = () => {
		if (isActiveFeed) {
			return;
		}

		dispatch(updateActiveFeed(id));
	};

	const handleDeleteFeed = () => {
		dispatch(deleteFeed(id));
	};

	return (
		<>
			<ListGroup.Item
				as="li"
				action
				active={isActiveFeed}
				onClick={handleUpdateActiveFeed}
				title={intl.formatMessage({ id: MESSAGES.FEEDS_TOOLTIP })}
				className="d-flex justify-content-between align-items-start"
				style={{ cursor: isActiveFeed ? 'default' : 'pointer' }}
			>
				<div className="ms-2 me-auto">
					<div className="d-flex align-items-center">
						<h3 className="h5 fw-bold" style={{ marginRight: 5 }}>
							{title}
						</h3>
						<Badge pill bg="danger" className="mb-2">
							{unreadPostsCount}
						</Badge>
					</div>
					<span>{truncateText(description)}</span>
				</div>
				{!!unreadPostsCount && (
					<div>
						<CloseButton onClick={handleOpenModal} />
					</div>
				)}
			</ListGroup.Item>
			<MyModal
				type={MODAL_TYPES.DELETE}
				isShow={isShowModal}
				handleClose={handleCloseModal}
				handleAction={handleDeleteFeed}
				title={title}
				description={intl.formatMessage({ id: MESSAGES.FEEDS_DELETE_WARNING })}
			/>
		</>
	);
};

export default FeedItem;
