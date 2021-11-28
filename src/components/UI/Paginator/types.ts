export enum PAGINATOR_CAPACITY {
	MIN = 2,
	EXTRA = 8,
	MIDPOINT = 5,
	MIDDLE_PAGES = 3,
}

export interface PaginationProps {
	pages: number[];
	activePage: number;
	handleSetActivePage: (page: number) => () => void;
}

export interface PaginationMediumProps extends PaginationProps {
	disableAnimation?: boolean;
}
