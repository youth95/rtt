import React from 'react';
import Help from './index';
export default {
  title: 'Help',
  component: Help,
};

export const ShowHelp = () => <Help />;

ShowHelp.story = {
  parameters: {
    notes: '帮助组件',
  },
};