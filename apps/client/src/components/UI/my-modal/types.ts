export enum MODAL_TYPES {
	PREVIEW = 'PREVIEW',
	MARK = 'MARK',
	DELETE = 'DELETE',
	RELOAD = 'RELOAD',
}

export type MODAL_TYPE = typeof MODAL_TYPES[keyof typeof MODAL_TYPES];
