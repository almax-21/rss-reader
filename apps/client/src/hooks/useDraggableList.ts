import { DragEvent, useRef } from 'react';

import { updateFeedsOrder } from '../store/slices/feedsSlice';
import { getNewOrder } from '../utils/collection';

import useTypedDispatch from './redux/useTypedDispatch';

export interface DragHandlers {
	handleDragStart: (currentItemOrder: number) => () => void;
	handleDragOver: (event: DragEvent) => void;
	handleDragLeave: (event: DragEvent) => void;
	handleDragEnd: (
		setNonDraggableItem: () => void
	) => (event: DragEvent) => void;
	handleDrop: (newItemOrder: number) => (event: DragEvent) => void;
}

const useDraggableList = (ids: string[]): DragHandlers => {
	const dispatch = useTypedDispatch();

	const currentItemOrderRef = useRef<number>(-1);

	const handleDragStart = (currentItemOrder: number) => () => {
		currentItemOrderRef.current = currentItemOrder;
	};

	const handleDragOver = (event: DragEvent) => {
		event.preventDefault();

		(event.target as HTMLElement).style.filter = 'blur(0.8px)';
	};

	const handleDragLeave = (event: DragEvent) => {
		(event.target as HTMLElement).style.filter = '';
	};

	const handleDragEnd =
		(setNonDraggableItem: () => void) => (event: DragEvent) => {
			(event.target as HTMLElement).style.filter = '';

			setNonDraggableItem();
		};

	const handleDrop = (newItemOrder: number) => (event: DragEvent) => {
		event.preventDefault();
		(event.target as HTMLElement).style.filter = '';

		const currentItemOrder = currentItemOrderRef.current;

		if (newItemOrder === currentItemOrder) {
			return;
		}

		const newIdsOrder = getNewOrder(ids, currentItemOrder, newItemOrder);

		dispatch(updateFeedsOrder(newIdsOrder));
	};

	return {
		handleDragStart,
		handleDragOver,
		handleDragLeave,
		handleDragEnd,
		handleDrop,
	};
};

export default useDraggableList;
