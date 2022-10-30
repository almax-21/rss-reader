import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { SvgIcon } from '@/components/UI/svg-icon';
import { SVG_ICON_VARIANTS } from '@/components/UI/svg-icon/types';

export default {
	title: 'components/UI/SvgIcon',
	component: SvgIcon,
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		width: {
			type: 'number',
			defaultValue: 24,
		},
		height: {
			type: 'number',
			defaultValue: 24,
		},
	},
} as ComponentMeta<typeof SvgIcon>;

const Template: ComponentStory<typeof SvgIcon> = (args) => (
	<SvgIcon {...args} />
);

export const WiFiOff = Template.bind({});
WiFiOff.args = {
	variant: SVG_ICON_VARIANTS.WIFI_OFF,
};

export const Sort = Template.bind({});
Sort.args = {
	variant: SVG_ICON_VARIANTS.SORT,
};

export const SortReverse = Template.bind({});
SortReverse.args = {
	variant: SVG_ICON_VARIANTS.SORT_REVERSE,
};

export const User = Template.bind({});
User.args = {
	variant: SVG_ICON_VARIANTS.USER,
};

export const Lang = Template.bind({});
Lang.args = {
	variant: SVG_ICON_VARIANTS.LANG,
};

export const Reload = Template.bind({});
Reload.args = {
	variant: SVG_ICON_VARIANTS.RELOAD,
};

export const MicrophoneOn = Template.bind({});
MicrophoneOn.args = {
	variant: SVG_ICON_VARIANTS.MICROPHONE_ON,
};

export const MicrophoneOff = Template.bind({});
MicrophoneOff.args = {
	variant: SVG_ICON_VARIANTS.MICROPHONE_OFF,
};

export const SignOut = Template.bind({});
SignOut.args = {
	variant: SVG_ICON_VARIANTS.SIGN_OUT,
};

export const Success = Template.bind({});
Success.args = {
	variant: SVG_ICON_VARIANTS.SUCCESS,
};

export const Danger = Template.bind({});
Danger.args = {
	variant: SVG_ICON_VARIANTS.DANGER,
};
