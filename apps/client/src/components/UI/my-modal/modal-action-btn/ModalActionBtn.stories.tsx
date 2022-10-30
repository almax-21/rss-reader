import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ModalActionBtn } from '@/components/UI/my-modal/modal-action-btn';
import rssMetaReducer from '@/store/slices/rssMetaSlice';
import type { RssState } from '@/store/types';

import { MODAL_TYPES } from '../types';

export default {
	title: 'components/UI/MyModal/ModalActionBtn',
	component: ModalActionBtn,
	parameters: {
		layout: 'centered',
	},
} as ComponentMeta<typeof ModalActionBtn>;

const Template: ComponentStory<typeof ModalActionBtn> = (args) => (
	<ModalActionBtn {...args} />
);

export const Preview = Template.bind({});
export const Mark = Template.bind({});
export const Delete = Template.bind({});
export const DeleteInProcess = Template.bind({});
export const Reload = Template.bind({});

const componentsData = [
	{
		Component: Preview,
		preloadedState: {},
		type: MODAL_TYPES.PREVIEW,
		url: 'https://rss-reader-web-client.herokuapp.com/',
		parameters: {},
	},
	{
		Component: Mark,
		preloadedState: {},
		type: MODAL_TYPES.MARK,
		url: '',
		parameters: {},
	},
	{
		Component: Delete,
		preloadedState: {},
		type: MODAL_TYPES.DELETE,
		url: '',
		parameters: {},
	},
	{
		Component: DeleteInProcess,
		preloadedState: {
			rssMeta: { isFeedDeleteInProcess: true } as RssState,
		},
		type: MODAL_TYPES.DELETE,
		url: '',
		parameters: { loki: { skip: true } },
	},
	{
		Component: Reload,
		preloadedState: {},
		type: MODAL_TYPES.RELOAD,
		url: '',
		parameters: {},
	},
];

componentsData.forEach(
	({ Component, preloadedState, type, url, parameters }) => {
		Component.decorators = [
			(Story) => {
				const store = configureStore({
					reducer: { rssMeta: rssMetaReducer },
					preloadedState,
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

		Component.args = {
			type,
			url,
		};

		Component.story = {
			parameters,
		};
	},
);
