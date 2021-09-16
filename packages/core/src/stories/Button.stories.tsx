import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from '../components/button/Button';

export default {
  title: 'Example/Button',
  component: Button,
  args: {
    children: 'Hello',
  }
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = Button

export const Primary = Template.bind({});
