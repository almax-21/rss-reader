import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		devTools: true,
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
