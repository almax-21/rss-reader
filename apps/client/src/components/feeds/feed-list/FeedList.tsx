import React, { FC } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useIntl } from 'react-intl';

import { MESSAGES } from '@/i18n/types';

import { FeedItem } from '../feed-item';

import { FeedListProps } from './types';

import styles from './styles.module.scss';

export const FeedList: FC<FeedListProps> = ({ feeds }) => {
	const intl = useIntl();

	return (
		<ListGroup
			numbered
			as="ol"
			className={styles['feed-list']}
			role="tablist"
			title={intl.formatMessage({ id: MESSAGES.FEEDS })}
		>
			{feeds.map((feed) => (
				<FeedItem key={feed._id} feed={feed} />
			))}
		</ListGroup>
	);
};
