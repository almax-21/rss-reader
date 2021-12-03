export enum MODAL_TYPES {
	PREVIEW = 'PREVIEW',
	MARK = 'MARK',
	DELETE = 'DELETE',
}

export type MODAL_TYPE = typeof MODAL_TYPES[keyof typeof MODAL_TYPES];

export interface ModalActionBtnProps {
	type: MODAL_TYPE;
	handleAction?: () => void;
	url?: string;
}

export interface MyModalProps extends ModalActionBtnProps {
	isShow: boolean;
	handleClose: () => void;
	title: string;
	description: string;
}
