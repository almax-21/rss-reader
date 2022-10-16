import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Paginator } from '@/components/UI/paginator';
import settingsReducer from '@/store/slices/settingsSlice';
import type { SettingsState } from '@/store/types';

export default {
	title: 'components/UI/Paginator',
	component: Paginator,
} as ComponentMeta<typeof Paginator>;

const Template: ComponentStory<typeof Paginator> = (args) => (
	<Paginator {...args} />
);

export const SimpleLight = Template.bind({});
export const SimpleDark = Template.bind({});
export const SimpleWithArrowsLight = Template.bind({});
export const SimpleWithArrowsDark = Template.bind({});
export const ExtraFirstLight = Template.bind({});
export const ExtraFirstDark = Template.bind({});
export const ExtraMiddleLight = Template.bind({});
export const ExtraMiddleDark = Template.bind({});
export const ExtraLastLight = Template.bind({});
export const ExtraLastDark = Template.bind({});
export const BiggestMiddleLight = Template.bind({});
export const BiggestMiddleDark = Template.bind({});

const componentsData = [
	{
		Component: SimpleLight,
		preloadedState: {},
		totalPages: 4,
	},
	{
		Component: SimpleDark,
		preloadedState: { settings: { isDarkTheme: true } as SettingsState },
		totalPages: 4,
	},
	{
		Component: SimpleWithArrowsLight,
		preloadedState: {},
		totalPages: 7,
	},
	{
		Component: SimpleWithArrowsDark,
		preloadedState: { settings: { isDarkTheme: true } as SettingsState },
		totalPages: 7,
	},
	{
		Component: ExtraFirstLight,
		preloadedState: {},
		totalPages: 8,
	},
	{
		Component: ExtraFirstDark,
		preloadedState: { settings: { isDarkTheme: true } as SettingsState },
		totalPages: 8,
	},
	{
		Component: ExtraMiddleLight,
		preloadedState: {},
		totalPages: 8,
		activePage: 5,
	},
	{
		Component: ExtraMiddleDark,
		preloadedState: { settings: { isDarkTheme: true } as SettingsState },
		totalPages: 8,
		activePage: 5,
	},
	{
		Component: ExtraLastLight,
		preloadedState: {},
		totalPages: 8,
		activePage: 8,
	},
	{
		Component: ExtraLastDark,
		preloadedState: { settings: { isDarkTheme: true } as SettingsState },
		totalPages: 8,
		activePage: 8,
	},
	{
		Component: BiggestMiddleLight,
		preloadedState: {},
		totalPages: 10,
		activePage: 5,
	},
	{
		Component: BiggestMiddleDark,
		preloadedState: { settings: { isDarkTheme: true } as SettingsState },
		totalPages: 10,
		activePage: 5,
	},
];

componentsData.forEach(
	({ Component, preloadedState, totalPages, activePage = 1 }) => {
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
							style={{ padding: 12, paddingBottom: 1 }}
						>
							<Story />
						</div>
					</Provider>
				);
			},
		];

		Component.args = {
			activePage,
			totalPages,
		};
	},
);
