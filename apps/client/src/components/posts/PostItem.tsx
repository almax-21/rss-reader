import React, { FC, useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import useTypedDispatch from '../../hooks/redux/useTypedDispatch';
import { MESSAGES } from '../../i18n/types';
import { IPost } from '../../models/IPost';
import setPostRead from '../../store/async-actions/setPostRead';
import { POST_STATES } from '../../store/types';
import { PostIdData } from '../../types';
import MyModal from '../UI/MyModal';
import { MODAL_TYPES } from '../UI/MyModal/types';

interface PostItemProps {
	post: IPost;
}

const PostItem: FC<PostItemProps> = React.memo(({ post }) => {
	const [isShowModal, setIsShowModal] = useState<boolean>(false);

	const { title, description, _id, feedId, url, state } = post;
	const dispatch = useTypedDispatch();

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
				d-flex
				justify-content-between
				align-items-center
				mb-4
				p-0
				border-0
			"
			>
				<Card className="border-0" style={{ paddingRight: '10px' }}>
					<Card.Title className="h6 fw-bold">
						<Card.Link
							className={
								state === POST_STATES.READ ? 'text-secondary' : 'text-primary'
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
				<Button size="sm" variant="outline-primary" onClick={handleOpenModal}>
					<FormattedMessage id={MESSAGES.PREVIEW} />
				</Button>
			</ListGroup.Item>
			<MyModal
				description={description}
				handleClose={handleCloseModal({ _id, feedId })}
				isShow={isShowModal}
				title={title}
				type={MODAL_TYPES.PREVIEW}
				url={url}
			/>
		</>
	);
});

PostItem.displayName = 'PostItem';

export default PostItem;
