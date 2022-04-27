import React, {
	FC,
	KeyboardEvent,
	MouseEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import { Badge, ListGroup } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import { AnyAction } from '@reduxjs/toolkit';

import useTypedDispatch from '../../../hooks/redux/useTypedDispatch';
import useTypedSelector from '../../../hooks/redux/useTypedSelector';
import { MESSAGES } from '../../../i18n/types';
import { FeedWithCounter } from '../../../models/Feed';
import deleteFeed from '../../../store/async-actions/deleteFeed';
import reloadFeed from '../../../store/async-actions/reloadFeed';
import { selectFeeds } from '../../../store/selectors/contentSelectors';
import { selectActiveFeedId } from '../../../store/selectors/contentSelectors';
import { updateActiveFeed } from '../../../store/slices/feedsSlice';
import { truncateText } from '../../../utils/text';
import MyModal from '../../UI/MyModal/index';
import { MODAL_TYPE, MODAL_TYPES } from '../../UI/MyModal/types';

import FeedBtnGroup from './FeedBtnGroup';

import './style.scss';

interface FeedItemProps {
	feed: FeedWithCounter;
}

const FeedItem: FC<FeedItemProps> = ({ feed }) => {
	const [isShowModal, setIsShowModal] = useState<boolean>(false);
	const [modalType, setModalType] = useState<MODAL_TYPE | null>(null);

	const { _id, title, description, unreadPostsCount, url } = feed;

	const activeFeedId = useTypedSelector(selectActiveFeedId);
	const isActive = _id === activeFeedId;

	const urlFeedHostname = new URL(url).hostname;

	const feeds = useTypedSelector(selectFeeds);

	const feedRef = useRef<HTMLLIElement>(null);

	const dispatch = useTypedDispatch();

	const intl = useIntl();

	const handleOpenModal =
		(modalType: MODAL_TYPE) => (event: MouseEvent<HTMLButtonElement>) => {
			event.stopPropagation();

			setIsShowModal(true);
			setModalType(modalType);
		};

	const handleCloseModal = () => {
		setIsShowModal(false);
	};

	const handleUpdateActiveFeed = () => {
		if (isActive) {
			return;
		}

		dispatch(updateActiveFeed(_id));
	};

	const handleKeyPress = (evt: KeyboardEvent<HTMLLIElement>) => {
		if (evt.key === 'Enter' || evt.key === ' ') {
			evt.preventDefault();

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

	const handleReloadFeed = () => {
		dispatch(reloadFeed({ url, feedId: _id }));
		handleCloseModal();
	};

	// we need to override bootstrap's tabIndex every time
	useEffect(() => {
		if (feedRef.current) {
			feedRef.current.tabIndex = 0;
		}
	}, [isActive]);

	return (
		<>
			<ListGroup.Item
				ref={feedRef}
				action={feeds.length > 1}
				active={isActive && feeds.length > 1}
				aria-role="tab"
				aria-selected={isActive && feeds.length > 1}
				as="li"
				className="list-item feed-item d-flex justify-content-center"
				id={_id}
				onClick={handleUpdateActiveFeed}
				onKeyPress={handleKeyPress}
			>
				<div className="d-flex flex-column justify-content-between ms-2 me-auto pe-none">
					<div className="d-flex align-items-center">
						<h3 className="feed-item__title h5 fw-bold">{title}</h3>
						<img
							aria-hidden
							alt={intl.formatMessage({ id: MESSAGES.FEED_LOGO })}
							className="feed-item__icon"
							height="16"
							src={`https://www.google.com/s2/favicons?sz=64&domain=www.${urlFeedHostname}`}
							width="16"
						/>
						{!!unreadPostsCount && (
							<Badge pill bg="danger" className="mb-2">
								<span className="visually-hidden">
									<FormattedMessage id={MESSAGES.POSTS_UNREAD_COUNT} />:
								</span>
								{unreadPostsCount}
							</Badge>
						)}
					</div>
					<span aria-hidden>{truncateText(description)}</span>
				</div>
				<FeedBtnGroup handleOpenModal={handleOpenModal} />
			</ListGroup.Item>

			{modalType && (
				<MyModal
					description={intl.formatMessage({
						id:
							modalType === MODAL_TYPES.DELETE
								? MESSAGES.FEEDS_DELETE_WARNING
								: MESSAGES.FEEDS_RELOAD_WARNING,
					})}
					handleAction={
						modalType === MODAL_TYPES.DELETE
							? handleDeleteFeed
							: handleReloadFeed
					}
					handleClose={handleCloseModal}
					isShow={isShowModal}
					title={title}
					type={modalType}
				/>
			)}
		</>
	);
};

export default FeedItem;
