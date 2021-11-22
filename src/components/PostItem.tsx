import React, { FC, useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { MESSAGES } from '../i18n/types';

import PreviewModal from './UI/PreviewModal';

interface PostItemProps {
	title: string;
	description: string;
	url: string;
}

const PostItem: FC<PostItemProps> = ({ title, description, url }) => {
	const [isShowModal, setIsShowModal] = useState<boolean>(false);

	const handleOpenModal = () => {
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
					<Card.Link href={url} target="_blank" rel="noreferrer">
						{title}
					</Card.Link>
				</Card.Title>
			</Card>
			<Button
				onClick={handleOpenModal}
				variant="outline-primary"
				size="sm"
			>
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
