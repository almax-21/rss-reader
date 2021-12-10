import React, { FC } from 'react';
import { Placeholder } from 'react-bootstrap';

import './style.scss';

const ContentSkeleton: FC = () => {
	return (
		<div className="content-skeleton">
			<div className="content-skeleton__item">
				<Placeholder animation="glow" as="p">
					<Placeholder xs={12} />
				</Placeholder>
				<Placeholder animation="wave" as="p">
					<Placeholder xs={12} />
				</Placeholder>
				<Placeholder animation="glow" as="p">
					<Placeholder xs={12} />
				</Placeholder>
				<Placeholder animation="wave" as="p">
					<Placeholder xs={12} />
				</Placeholder>
			</div>
			<div className="content-skeleton__item">
				<Placeholder animation="glow" as="p">
					<Placeholder xs={12} />
				</Placeholder>
				<Placeholder animation="wave" as="p">
					<Placeholder xs={12} />
				</Placeholder>
				<Placeholder animation="glow" as="p">
					<Placeholder xs={12} />
				</Placeholder>
				<Placeholder animation="wave" as="p">
					<Placeholder xs={12} />
				</Placeholder>
			</div>
		</div>
	);
};

export default ContentSkeleton;
