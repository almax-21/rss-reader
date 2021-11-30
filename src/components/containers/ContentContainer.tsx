import React, { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import useTypedSelector from '../../hooks/redux/useTypedSelector';
import useAutoUpdate from '../../hooks/useAutoUpdate';
import { MESSAGES } from '../../i18n/types';
import { selectFeedsAndPosts, selectRSS } from '../../store/selectors/rss';
import FeedContent from '../feeds';
import PostContent from '../posts';

const UPDATE_PERIOD_MS = 6000

const ContentContainer: FC = () => {
	const { feeds } = useTypedSelector(selectFeedsAndPosts);
	const { urlDataset } = useTypedSelector(selectRSS);

	useAutoUpdate(urlDataset, UPDATE_PERIOD_MS);

	if (feeds.length === 0) {
		return (
			<Container fluid className="container-xxl p-5">
				<Row className="flex-wrap-reverse">
					<h2 className="display-5 text-center">
						<FormattedMessage id={MESSAGES.NO_FEEDS} />
					</h2>
				</Row>
			</Container>
		);
	}

	return (
		<Container fluid className="container-xxl p-5">
			<Row className="flex-wrap-reverse">
				<Col as="section" className="mb-5">
					<PostContent />
				</Col>
				<Col as="section" className="mb-5">
					<FeedContent />
				</Col>
			</Row>
		</Container>
	);
};

export default ContentContainer;
