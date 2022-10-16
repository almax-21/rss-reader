import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Notification } from '@/components/UI/notification';
import { NOTIFICATION_VARIANT } from '@/components/UI/notification/types';

export default {
	title: 'components/UI/Notification',
	component: Notification,
} as ComponentMeta<typeof Notification>;

const Template: ComponentStory<typeof Notification> = (args) => (
	<Notification {...args} />
);

export const Success = Template.bind({});
export const Error = Template.bind({});

const baseArgs = {
	isShow: true,
	onClose: () => alert('close'),
};

const componentsData = [
	{
		Component: Success,
		args: {
			...baseArgs,
			data: {
				variant: NOTIFICATION_VARIANT.SUCCESS,
				message: 'Success',
			},
		},
	},
	{
		Component: Error,
		args: {
			...baseArgs,
			data: {
				variant: NOTIFICATION_VARIANT.ERROR,
				message: 'Error',
			},
		},
	},
];

componentsData.forEach(({ Component, args }) => {
	Component.args = args;
});
