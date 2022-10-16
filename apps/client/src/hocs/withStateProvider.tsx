/* eslint-disable react/display-name */

import type { ComponentType } from 'react';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import type { BaseProps } from './types';

const withStateProvider = (rootReducer = {}, preloadedState = {}) => {
	return <T extends BaseProps>(Component: ComponentType<T>) =>
		(props = {} as T) => {
			const store = configureStore({
				reducer: rootReducer,
				preloadedState,
			});

			return (
				<Provider store={store}>
					<Component {...props} />
				</Provider>
			);
		};
};

export default withStateProvider;
