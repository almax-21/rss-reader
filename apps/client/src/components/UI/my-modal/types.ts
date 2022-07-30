export enum MODAL_TYPES {
	PREVIEW = 'PREVIEW',
	MARK = 'MARK',
	DELETE = 'DELETE',
	RELOAD = 'RELOAD',
}

export type MODAL_TYPE = typeof MODAL_TYPES[keyof typeof MODAL_TYPES];

export interface ModalActionBtnProps {
	type: MODAL_TYPE;
	handleAction?: () => void;
	url?: string;
}

export type MyModalProps = ModalActionBtnProps & {
	isShow: boolean;
	handleClose: () => void;
	title: string;
	description: string;
	imgSrc?: string;
};
