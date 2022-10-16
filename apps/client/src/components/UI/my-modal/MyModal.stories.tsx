import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import imgSrc from '@/assets/imgs/creepy-aurora.jpg';
import { MyModal } from '@/components/UI/my-modal';
import { AppRootElContext } from '@/contexts';
import settingsReducer from '@/store/slices/settingsSlice';
import type { SettingsState } from '@/store/types';

import { MODAL_TYPES } from './types';

export default {
	title: 'components/UI/MyModal',
	component: MyModal,
	parameters: {
		layout: 'centered',
	},
} as ComponentMeta<typeof MyModal>;

const Template: ComponentStory<typeof MyModal> = (args) => (
	<MyModal {...args} />
);

export const SimpleLight = Template.bind({});
export const SimpleDark = Template.bind({});
export const WithImageLight = Template.bind({});
export const WithImageDark = Template.bind({});

const componentsData = [
	{
		Component: SimpleLight,
		preloadedState: {},
		type: MODAL_TYPES.PREVIEW,
		imgSrc: '',
		url: 'https://rss-reader-web-client.herokuapp.com/',
	},
	{
		Component: SimpleDark,
		preloadedState: {
			settings: { isDarkTheme: true } as SettingsState,
		},
		type: MODAL_TYPES.PREVIEW,
		imgSrc: '',
		url: 'asd',
	},
	{
		Component: WithImageLight,
		preloadedState: {},
		type: MODAL_TYPES.PREVIEW,
		imgSrc,
		url: 'https://rss-reader-web-client.herokuapp.com/',
	},
	{
		Component: WithImageDark,
		preloadedState: {
			settings: { isDarkTheme: true } as SettingsState,
		},
		type: MODAL_TYPES.PREVIEW,
		imgSrc,
		url: 'asd',
	},
];

componentsData.forEach(({ Component, preloadedState, type, imgSrc, url }) => {
	Component.decorators = [
		(Story) => {
			const store = configureStore({
				reducer: {
					settings: settingsReducer,
					rssMeta: settingsReducer,
				},
				preloadedState,
			});

			preloadedState.settings?.isDarkTheme
				? document.body.classList.add('dark-theme')
				: document.body.classList.remove('dark-theme');

			return (
				<Provider store={store}>
					<AppRootElContext.Provider value={document.querySelector('#root')}>
						<Story />
					</AppRootElContext.Provider>
				</Provider>
			);
		},
	];

	Component.args = {
		title: 'Lorem ipsum',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, a maiores nulla vel laborum voluptatibus maxime provident hic commodi qui eius accusamus nihil eveniet delectus earum vitae. Harum, beatae suscipit?',
		isShow: true,
		imgSrc,
		url,
		type,
		handleClose: () => alert('close'),
		handleAction: () => alert('action'),
	};
});
