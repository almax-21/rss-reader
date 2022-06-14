import { MouseEvent } from 'react';

import { MODAL_TYPE } from '@/components/UI/my-modal/types';

export interface FeedBtnGroupProps {
	handleOpenModal: (
		modalType: MODAL_TYPE
	) => (event: MouseEvent<HTMLButtonElement>) => void;
}
