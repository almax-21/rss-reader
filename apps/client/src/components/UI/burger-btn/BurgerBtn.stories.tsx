import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { BurgerBtn } from '@/components/UI/burger-btn';

export default {
	title: 'components/UI/BurgerBtn',
	component: BurgerBtn,
	parameters: {
		layout: 'centered',
	},
} as ComponentMeta<typeof BurgerBtn>;

const Template: ComponentStory<typeof BurgerBtn> = (args) => (
	<BurgerBtn {...args} />
);

export const Default = Template.bind({});

Default.args = {
	isActive: false,
	onClick: () => alert('click'),
};
