import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { MyDropDown } from '@/components/UI/my-drop-down';
import settingsReducer from '@/store/slices/settingsSlice';
import type { SettingsState } from '@/store/types';
import { POST_STATES } from '@/store/types';

export default {
	title: 'components/UI/MyDropDown',
	component: MyDropDown,
	parameters: {
		layout: 'centered',
	},
} as ComponentMeta<typeof MyDropDown>;

const Template: ComponentStory<typeof MyDropDown> = (args) => (
	<MyDropDown {...args} />
);

export const Default = Template.bind({});

// TODO: @loki/create-async-callback
// wait for this package to work to test asynchronous actions
// export const ExpandedLight = Template.bind({});
// export const ExpandedDark = Template.bind({});

const Components = [Default /* ExpandedLight, ExpandedDark */];

Components.forEach((Component, index) => {
	Component.decorators = [
		(Story) => {
			const store = configureStore({
				reducer: { settings: settingsReducer },
				preloadedState: {
					settings: { isDarkTheme: Boolean(index === 2) } as SettingsState,
				},
			});

			return (
				<Provider store={store}>
					<div style={{ padding: 8 }}>
						<Story />
					</div>
				</Provider>
			);
		},
	];

	if (index) {
		Component.play = async ({ canvasElement }) => {
			const canvas = within(canvasElement);

			await userEvent.click(canvas.getByRole('button'));
		};
	}

	Component.args = {
		activeValue: POST_STATES.ALL,
		title: 'All',
		values: Object.values(POST_STATES),
		variant: 'outline-secondary',
	};
});
