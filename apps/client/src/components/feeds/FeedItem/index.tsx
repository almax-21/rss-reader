import React, { FC, KeyboardEvent, MouseEvent, useState } from 'react';
import { Badge, CloseButton, ListGroup } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { AnyAction } from '@reduxjs/toolkit';

import useTypedDispatch from '../../../hooks/redux/useTypedDispatch';
import useTypedSelector from '../../../hooks/redux/useTypedSelector';
import { MESSAGES } from '../../../i18n/types';
import { IFeedWithCounter } from '../../../models/IFeed';
import deleteFeed from '../../../store/async-actions/deleteFeed';
import { selectFeeds } from '../../../store/selectors/contentSelectors';
import { selectActiveFeedId } from '../../../store/selectors/contentSelectors';
import { selectSettings } from '../../../store/selectors/settingsSelectors';
import { updateActiveFeed } from '../../../store/slices/feedsSlice';
import { truncateText } from '../../../utils/text';
import MyModal from '../../UI/MyModal/index';
import { MODAL_TYPES } from '../../UI/MyModal/types';

import './style.scss';

interface FeedItemProps {
	feed: IFeedWithCounter;
}

const FeedItem: FC<FeedItemProps> = ({ feed }) => {
	const [isShowModal, setIsShowModal] = useState<boolean>(false);

	const { _id, title, description, unreadPostsCount, url } = feed;

	const activeFeedId = useTypedSelector(selectActiveFeedId);
	const isActiveFeed = _id === activeFeedId;

	const urlFeedHostname = new URL(url).hostname;

	const feeds = useTypedSelector(selectFeeds);

	const { isDarkTheme } = useTypedSelector(selectSettings);

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

	const handleKeyPress = (evt: KeyboardEvent<HTMLLIElement>) => {
		if (evt.key === 'Enter') {
			handleUpdateActiveFeed();
		}
	};

	const handleDeleteFeed = () => {
		dispatch(deleteFeed(_id)).then((action: AnyAction) => {
			if (action.meta.requestStatus === 'rejected') {
				handleCloseModal();
			}
		});
	};

	return (
		<>
			<ListGroup.Item
				action={feeds.length > 1}
				active={isActiveFeed && feeds.length > 1}
				as="li"
				className="list-item feed-item d-flex justify-content-center"
				tabIndex={0}
				title={intl.formatMessage({ id: MESSAGES.FEEDS_TOOLTIP_SELECT })}
				onClick={handleUpdateActiveFeed}
				onKeyPress={handleKeyPress}
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
