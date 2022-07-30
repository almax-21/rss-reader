import type { MouseEvent } from 'react';

import type { MODAL_TYPE } from '@/components/UI/my-modal/types';

export interface FeedBtnGroupProps {
	handleOpenModal: (
		modalType: MODAL_TYPE
	) => (event: MouseEvent<HTMLButtonElement>) => void;
}
