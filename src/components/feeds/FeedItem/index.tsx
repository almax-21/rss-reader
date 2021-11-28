import React, { FC, MouseEvent, useState } from 'react';
import { Badge, CloseButton, ListGroup } from 'react-bootstrap';
import { useIntl } from 'react-intl';

import useTypedDispatch from '../../../hooks/redux/useTypedDispatch';
import useTypedSelector from '../../../hooks/redux/useTypedSelector';
import { MESSAGES } from '../../../i18n/types';
import { selectActiveFeedId, selectFeeds } from '../../../store/selectors/rss';
import { deleteFeed, updateActiveFeed } from '../../../store/slices/rssSlice';
import { truncateText } from '../../../utils/text';
import MyModal from '../../UI/MyModal/index';
import { MODAL_TYPES } from '../../UI/MyModal/types';

import './style.scss';

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
	const feeds = useTypedSelector(selectFeeds);
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
				action={feeds.length > 1}
				active={isActiveFeed && feeds.length > 1}
				as="li"
				className="feed-item d-flex justify-content-center align-items-start"
				title={intl.formatMessage({ id: MESSAGES.FEEDS_TOOLTIP })}
				onClick={handleUpdateActiveFeed}
			>
				<div className="ms-2 me-auto">
					<div className="d-flex align-items-center">
						<h3 className="feed-item__title h5 fw-bold">{title}</h3>
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
				description={intl.formatMessage({ id: MESSAGES.FEEDS_DELETE_WARNING })}
				handleAction={handleDeleteFeed}
				handleClose={handleCloseModal}
				isShow={isShowModal}
				title={title}
				type={MODAL_TYPES.DELETE}
			/>
		</>
	);
};

export default FeedItem;
