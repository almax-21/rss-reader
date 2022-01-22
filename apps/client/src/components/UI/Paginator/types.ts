export enum PAGINATOR_CAPACITY {
	MIN = 2,
	EXTRA = 8,
	MIDPOINT = 5,
	RANGE = 3,
}

export interface PaginationProps {
	pages: number[];
	activePage: number;
	handleSetActivePage: (page: number) => () => void;
}

export type PaginationInnerProps = PaginationProps & {
	disableAnimation?: boolean;
};
