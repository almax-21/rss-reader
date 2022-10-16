import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ScrollTopBtn } from '@/components/UI/scroll-top-btn';

export default {
	title: 'components/UI/ScrollTopBtn',
	component: ScrollTopBtn,
} as ComponentMeta<typeof ScrollTopBtn>;

const Template: ComponentStory<typeof ScrollTopBtn> = (args) => (
	<ScrollTopBtn {...args} />
);

export const Light = Template.bind({});
export const Dark = Template.bind({});
export const LokiTestOnly = Template.bind({});

const componentsData = [
	{
		Component: Light,
		className: 'dark-theme',
		backgroundColor: '#6c757d',
	},
	{
		Component: Dark,
		className: '',
		backgroundColor: 'transparent',
	},
];

componentsData.forEach(({ Component, className, backgroundColor }) => {
	Component.decorators = [
		(Story) => (
			<div
				className={className}
				style={{ padding: 24, height: 2000, backgroundColor }}
			>
				<h2>Scroll to bottom to see</h2>
				<Story />
			</div>
		),
	];

	Component.story = {
		parameters: { loki: { skip: true } },
	};
});
