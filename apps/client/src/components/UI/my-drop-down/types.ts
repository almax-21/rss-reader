import type { Variant } from 'react-bootstrap/esm/types';

export interface MyDropDownProps<T> {
	variant: Variant;
	title: string;
	values: Array<T>;
	activeValue: T;
	handleSetActiveValue: (value: T) => () => void;
}
