import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Notification } from '@/components/UI/notification';

export default {
	title: 'Example/Notification',
	component: Notification,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as ComponentMeta<typeof Notification>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Notification> = (args) => (
	<Notification {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
	data: {
		variant: 'primary',
		message: 'Kek',
	},
	isShow: true,
	onClose: () => console.log('kek'),
};
