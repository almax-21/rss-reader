import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ContentSkeleton } from '@/components/UI/content-skeleton';
import settingsReducer from '@/store/slices/settingsSlice';
import type { SettingsState } from '@/store/types';

export default {
	title: 'components/UI/ContentSkeleton',
	component: ContentSkeleton,
} as ComponentMeta<typeof ContentSkeleton>;

const Template: ComponentStory<typeof ContentSkeleton> = () => (
	<ContentSkeleton />
);

export const Light = Template.bind({});
export const Dark = Template.bind({});

const componentsData = [
	{
		Component: Light,
		preloadedState: {},
		backgroundColor: 'transparent',
	},
	{
		Component: Dark,
		preloadedState: { settings: { isDarkTheme: true } as SettingsState },
		backgroundColor: '#6c757d',
	},
];

componentsData.forEach(({ Component, preloadedState, backgroundColor }) => {
	Component.decorators = [
		(Story) => {
			const store = configureStore({
				reducer: { settings: settingsReducer },
				preloadedState,
			});

			const isDarkTheme = preloadedState.settings?.isDarkTheme;

			return (
				<Provider store={store}>
					<div
						className={isDarkTheme ? 'dark-theme' : ''}
						style={{ padding: 24, backgroundColor }}
					>
						<Story />
					</div>
				</Provider>
			);
		},
	];
});
