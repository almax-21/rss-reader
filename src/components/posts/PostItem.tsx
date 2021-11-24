import React, { FC, useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import useTypedDispatch from '../../hooks/redux/useTypedDispatch';
import { MESSAGES } from '../../i18n/types';
import { setPostRead } from '../../store/slices/rssSlice';
import { IPost } from '../../types';
import PreviewModal from '../PreviewModal';

interface PostItemProps {
	post: IPost;
}

const PostItem: FC<PostItemProps> = ({ post }) => {
	const [isShowModal, setIsShowModal] = useState<boolean>(false);

	const { title, description, id, url, isRead } = post;
	const dispatch = useTypedDispatch();

	const handlePostRead = (id: string) => () => {
		if (isRead) {
			return;
		}

		dispatch(setPostRead(id));
	};

	const handleOpenModal = (id: string) => () => {
		handlePostRead(id)();
		setIsShowModal(true);
	};

	const handleCloseModal = () => {
		setIsShowModal(false);
	};

	return (
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
			<Card className="border-0">
				<Card.Title className="h6 fw-bold">
					<Card.Link
						href={url}
						target="_blank"
						rel="noreferrer"
						onClick={handlePostRead(id)}
						className={isRead ? 'text-secondary' : 'text-primary'}
					>
						{title}
					</Card.Link>
				</Card.Title>
			</Card>
			<Button onClick={handleOpenModal(id)} variant="outline-primary" size="sm">
				<FormattedMessage id={MESSAGES.PREVIEW} />
			</Button>
			<PreviewModal
				isShow={isShowModal}
				onClose={handleCloseModal}
				title={title}
				description={description}
				url={url}
			/>
		</ListGroup.Item>
	);
};

export default PostItem;
