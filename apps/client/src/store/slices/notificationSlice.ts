import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { COMPLETED_LOAD_STATUS, NotificationState } from '../types';

const initialState: NotificationState = {
	completedLoadStatus: COMPLETED_LOAD_STATUS.IDLE,
	successMessage: '',
	errorMessage: '',
};

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		notificationReqPending: (state) => {
			state.completedLoadStatus = COMPLETED_LOAD_STATUS.IDLE;
			state.successMessage = '';
			state.errorMessage = '';
		},
		notificationReqSuccess: (state, action: PayloadAction<string>) => {
			state.completedLoadStatus = COMPLETED_LOAD_STATUS.SUCCESS;
			state.successMessage = action.payload;
		},
		notificationReqFailure: (state, action: PayloadAction<string>) => {
			state.completedLoadStatus = COMPLETED_LOAD_STATUS.FAILURE;
			state.errorMessage = action.payload;
		},
	},
});

export const {
	notificationReqPending,
	notificationReqSuccess,
	notificationReqFailure,
} = notificationSlice.actions;

export default notificationSlice.reducer;
