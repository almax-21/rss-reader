export enum PAGINATOR_CAPACITY {
	MIN = 2,
	EXTRA = 8,
	MIDPOINT = 5,
	RANGE = 3,
}

export interface PaginationProps {
	pages: number[];
	activePage: number;
	onClick: (page: number) => () => void;
}
