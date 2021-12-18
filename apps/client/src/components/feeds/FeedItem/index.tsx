import React, { FC, MouseEvent, useState } from 'react';
import { Badge, CloseButton, ListGroup } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { AnyAction } from '@reduxjs/toolkit';

import useTypedDispatch from '../../../hooks/redux/useTypedDispatch';
import useTypedSelector from '../../../hooks/redux/useTypedSelector';
import { DragHandlers } from '../../../hooks/useDraggableList';
import { MESSAGES } from '../../../i18n/types';
import { IFeedWithCounter } from '../../../models/IFeed';
import deleteFeed from '../../../store/async-actions/deleteFeed';
import { selectFeeds } from '../../../store/selectors/contentSelectors';
import { selectActiveFeedId } from '../../../store/selectors/contentSelectors';
import { selectSettings } from '../../../store/selectors/settingsSelectors';
import { updateActiveFeed } from '../../../store/slices/feedsSlice';
import { truncateText } from '../../../utils/text';
import DnDBtn from '../../UI/DnDBtn';
import MyModal from '../../UI/MyModal/index';
import { MODAL_TYPES } from '../../UI/MyModal/types';

import './style.scss';

interface FeedItemProps {
	feed: IFeedWithCounter;
	order: number;
	dragHandlers: DragHandlers;
}

const FeedItem: FC<FeedItemProps> = ({ feed, order, dragHandlers }) => {
	const [isShowModal, setIsShowModal] = useState<boolean>(false);
	const [isDraggable, setIsDraggable] = useState<boolean>(false);

	const { _id, title, description, unreadPostsCount, url } = feed;

	const activeFeedId = useTypedSelector(selectActiveFeedId);
	const isActiveFeed = _id === activeFeedId;

	const urlFeedHostname = new URL(url).hostname;

	const feeds = useTypedSelector(selectFeeds);

	const { isDarkTheme } = useTypedSelector(selectSettings);

	const isTouchDevice = window.matchMedia('(hover)').matches;

	const dispatch = useTypedDispatch();

	const intl = useIntl();

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

		dispatch(updateActiveFeed(_id));
	};

	const handleDeleteFeed = () => {
		dispatch(deleteFeed(_id)).then((action: AnyAction) => {
			if (action.meta.requestStatus === 'rejected') {
				handleCloseModal();
			}
		});
	};

	const setDraggable = () => () => {
		setIsDraggable(true);
	};

	const {
		handleDragStart,
		handleDragOver,
		handleDragLeave,
		handleDragEnd,
		handleDrop,
	} = dragHandlers;

	return (
		<>
			<ListGroup.Item
				action={feeds.length > 1}
				active={isActiveFeed && feeds.length > 1}
				as="li"
				className="list-item feed-item d-flex justify-content-center"
				draggable={isDraggable}
				title={intl.formatMessage({ id: MESSAGES.FEEDS_TOOLTIP_SELECT })}
				onClick={handleUpdateActiveFeed}
				onDragEnd={handleDragEnd(() => setIsDraggable(false))}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
				onDragStart={handleDragStart(order)}
				onDrop={handleDrop(order)}
			>
				<div className="ms-2 me-auto pe-none">
					<div className="d-flex align-items-center">
						<h3 className="feed-item__title h5 fw-bold">{title}</h3>
						<img
							alt={intl.formatMessage({ id: MESSAGES.FEED_LOGO })}
							className="feed-item__icon"
							height="16"
							src={`https://www.google.com/s2/favicons?sz=64&domain=www.${urlFeedHostname}`}
							width="16"
						/>
						{!!unreadPostsCount && (
							<Badge pill bg="danger" className="mb-2">
								{unreadPostsCount}
							</Badge>
						)}
					</div>
					<span>{truncateText(description)}</span>
				</div>
				<div className="d-flex flex-column justify-content-between">
					<CloseButton
						variant={isDarkTheme ? 'white' : undefined}
						onClick={handleOpenModal}
					/>
					{isTouchDevice && <DnDBtn setAncestorDraggable={setDraggable()} />}
				</div>
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
