import type { FC } from 'react';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { FeedContent } from '@/components/feeds';
import { PostContent } from '@/components/posts';
import { ContentSkeleton } from '@/components/UI/content-skeleton';
import { useAutoUpdate } from '@/hooks';
import{ useTypedSelector } from '@/hooks';
import { MESSAGES } from '@/i18n/types';
import { selectFeedsWithCounter } from '@/store/selectors/contentSelectors';
import { selectRssMeta } from '@/store/selectors/rssMetaSelectors';
import { selectSettings } from '@/store/selectors/settingsSelectors';

export const ContentContainer: FC = () => {
	const feeds = useTypedSelector(selectFeedsWithCounter);

	const { isLoadingFromApi, urlDataset } = useTypedSelector(selectRssMeta);

	const { isAutoUpdate } = useTypedSelector(selectSettings);

	useAutoUpdate(urlDataset, isAutoUpdate);

	if (isLoadingFromApi) {
		return (
			<Container className="container-xxl p-4">
				<Row>
					<ContentSkeleton />
				</Row>
			</Container>
		);
	}

	return (
		<Container className="container-xxl p-4">
			{feeds.length === 0 ? (
				<Row>
					<h2 className="display-5 text-center">
						<FormattedMessage id={MESSAGES.NO_FEEDS} />
					</h2>
				</Row>
			) : (
				<Row className="flex-row-reverse flex-wrap">
					<Col as="section" className="mb-5">
						<FeedContent />
					</Col>
					<Col as="section" className="mb-5">
						<PostContent />
					</Col>
				</Row>
			)}
		</Container>
	);
};
