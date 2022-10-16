import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { MySpinner } from '@/components/UI/my-spinner';

export default {
	title: 'components/UI/MySpinner',
	component: MySpinner,
	parameters: {
		layout: 'centered',
	},
} as ComponentMeta<typeof MySpinner>;

const Template: ComponentStory<typeof MySpinner> = (args) => (
	<MySpinner {...args} />
);

export const Default = Template.bind({});

Default.args = {
	isDark: false,
	small: false,
};

Default.decorators = [
	(Story) => (
		<div style={{ padding: 8, backgroundColor: '#6c757d' }}>
			<Story />
		</div>
	),
];

Default.story = {
	parameters: { loki: { skip: true } },
};
