import React, { FC, useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import useTypedDispatch from '../../../hooks/redux/useTypedDispatch';
import useTypedSelector from '../../../hooks/redux/useTypedSelector';
import { MESSAGES } from '../../../i18n/types';
import { Post } from '../../../models/Post';
import setPostRead from '../../../store/async-actions/setPostRead';
import { selectSettings } from '../../../store/selectors/settingsSelectors';
import { POST_STATES } from '../../../store/types';
import { PostIdData } from '../../../types';
import { MyModal } from '../../ui/my-modal';
import { MODAL_TYPES } from '../../ui/my-modal/types';

import './style.scss';

interface PostItemProps {
	post: Post;
}

export const PostItem: FC<PostItemProps> = React.memo(({ post }) => {
	const [isShowModal, setIsShowModal] = useState<boolean>(false);

	const { title, description, _id, feedId, url, imgSrc, state } = post;

	const { isDarkTheme } = useTypedSelector(selectSettings);

	const dispatch = useTypedDispatch();

	const unreadPostClass = isDarkTheme ? 'text-light' : 'text-primary';

	const handlePostRead = (postIDs: PostIdData) => () => {
		if (state === POST_STATES.READ) {
			return;
		}

		dispatch(setPostRead(postIDs));
	};

	const handleOpenModal = () => {
		setIsShowModal(true);
	};

	const handleCloseModal = (postIDs: PostIdData) => () => {
		handlePostRead(postIDs)();
		setIsShowModal(false);
	};

	return (
		<>
			<ListGroup.Item
				as="li"
				className="
				post-item
				d-flex
				justify-content-between
				align-items-center
				mb-4
				p-0
				border-0
			"
			>
				<Card className="post-item__body border-0">
					<Card.Title className="h6 fw-bold">
						<Card.Link
							className={
								state === POST_STATES.READ ? 'text-secondary' : unreadPostClass
							}
							href={url}
							rel="noreferrer"
							target="_blank"
							onClick={handlePostRead({ _id, feedId })}
						>
							{title}
						</Card.Link>
					</Card.Title>
				</Card>
				<Button
					size="sm"
					variant={isDarkTheme ? 'outline-light' : 'outline-primary'}
					onClick={handleOpenModal}
				>
					<FormattedMessage id={MESSAGES.PREVIEW} />
				</Button>
			</ListGroup.Item>
			<MyModal
				description={description}
				handleClose={handleCloseModal({ _id, feedId })}
				imgSrc={imgSrc}
				isShow={isShowModal}
				title={title}
				type={MODAL_TYPES.PREVIEW}
				url={url}
			/>
		</>
	);
});

PostItem.displayName = 'PostItem';
