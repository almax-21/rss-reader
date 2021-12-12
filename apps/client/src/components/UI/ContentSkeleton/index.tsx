import React, { FC } from 'react';
import { Placeholder } from 'react-bootstrap';

import './style.scss';

const ContentSkeleton: FC = () => {
	return (
		<div className="content-skeleton">
			<div className="content-skeleton__item">
				<Placeholder animation="wave" as="p" className="mb-3">
					<Placeholder xs={2} />
				</Placeholder>
				<Placeholder animation="glow" as="h2" className="mb-4">
					<Placeholder xs={8} />
				</Placeholder>
				<Placeholder
					animation="wave"
					as="p"
					className="d-flex justify-content-between mb-4"
					xs={8}
				>
					<Placeholder.Button animation="wave" xs={3} />
					<Placeholder.Button animation="wave" xs={3} />
				</Placeholder>
				<Placeholder
					animation="glow"
					as="p"
					className="d-flex justify-content-between mb-5"
					xs={12}
				>
					<Placeholder xs={10} />
					<Placeholder.Button animation="glow" xs={1} />
				</Placeholder>
				<Placeholder
					animation="wave"
					as="p"
					className="d-flex justify-content-between mb-5"
					xs={12}
				>
					<Placeholder xs={10} />
					<Placeholder.Button animation="wave" xs={1} />
				</Placeholder>
				<Placeholder
					animation="glow"
					as="p"
					className="d-flex justify-content-between mb-5"
					xs={12}
				>
					<Placeholder xs={10} />
					<Placeholder.Button animation="glow" xs={1} />
				</Placeholder>
			</div>
			<div className="content-skeleton__item">
				<Placeholder animation="wave" as="p" className="mb-3">
					<Placeholder xs={2} />
				</Placeholder>
				<Placeholder animation="glow" as="h1" className="mb-3">
					<Placeholder bg="primary" xs={12} />
				</Placeholder>
				<Placeholder animation="wave" as="h1" className="mb-3">
					<Placeholder xs={12} />
				</Placeholder>
				<Placeholder animation="glow" as="h1" className="mb-3">
					<Placeholder xs={12} />
				</Placeholder>
			</div>
		</div>
	);
};

export default ContentSkeleton;
