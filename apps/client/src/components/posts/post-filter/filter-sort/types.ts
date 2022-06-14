import { SORT_TYPE } from '@/types';

export interface FilterSortProps {
	activeSortType: SORT_TYPE;
	classes: string;
	sortHandler: (newType: SORT_TYPE) => () => void;
}
