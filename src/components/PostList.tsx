import React, { FC } from 'react';
import { ListGroup } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { MESSAGES } from '../i18n/types';
import { IPost } from '../models/IPost';
import PostItem from './PostItem';

interface PostListProps {
	posts: IPost[];
}

const PostList: FC<PostListProps> = ({ posts }) => {
	return (
		<div>
			<h2 className="h3 mb-4">
				<FormattedMessage id={MESSAGES.POSTS} />
			</h2>
			<ListGroup as="ul">
				{posts.map(({ title, description, id, url }) => (
					<PostItem
						key={id}
						title={title}
						description={description}
						url={url}
					/>
				))}
			</ListGroup>
		</div>
	);
};

export default PostList;
