import React from 'react';
import { Checkbox, Grid, IconButton, Switch, Typography } from '@material-ui/core';
import ColorizeIcon from '@material-ui/icons/Colorize';
import MenuIcon from '@material-ui/icons/Menu';
import WrapperWidgetUI from '../../widgets/WrapperWidgetUI';
import { Layers } from '@material-ui/icons';

export default {
  title: 'Widgets/WrapperWidgetUI',
  component: WrapperWidgetUI,
  argTypes: {
    actions: {
      table: { disable: true },
    },
    options: {
      table: { disable: true },
    },
    children: {
      table: { disable: true },
    },
  },
};

const Template = (args) => (
  <WrapperWidgetUI {...args}>
    <Typography>Your Content</Typography>
  </WrapperWidgetUI>
);

export const Default = Template.bind({});
Default.args = { title: 'Default wrapper' };

export const OnlyTitle = Template.bind({});
OnlyTitle.args = { title: 'Default wrapper' };

export const Expandable = Template.bind({});
Expandable.args = { title: 'Expandable', expandable: true };

export const NotExpandable = Template.bind({});
NotExpandable.args = { title: 'Not Expandable', expandable: false };

export const Loading = Template.bind({});
Loading.args = { title: 'Loading', loading: true };

export const WithActions = Template.bind({});
WithActions.args = {
  title: 'Wrapper with actions',
  actions: (
    <React.Fragment>
      <IconButton onClick={() => alert('Hello world!')}>
        <ColorizeIcon />
      </IconButton>
      <IconButton>
        <Layers />
      </IconButton>
      <Grid>
        <Checkbox></Checkbox>
      </Grid>
    </React.Fragment>
  ),
  options: [
    { id: 'o1', name: 'Option 1', action: () => alert('Option 1!') },
    { id: 'o2', name: 'Option 2', action: () => alert('Option 2!') },
  ],
};

export const WithOptions = Template.bind({});
WithOptions.args = {
  title: 'Wrapper with options',
};

export const WithActionsAndOptions = Template.bind({});
WithActionsAndOptions.args = {
  title: 'Wrapper with actions and options',
  options: [
    { id: 'o1', name: 'Option 1', action: () => alert('Option 1!') },
    { id: 'o2', name: 'Option 2', action: () => alert('Option 2!') },
  ],
};

export const WithOptionsAndCustomIcon = Template.bind({});
WithOptionsAndCustomIcon.args = {
  title: 'Wrapper with options and custom icon',
  options: [
    { id: 'o1', name: 'Option 1', action: () => alert('Option 1!') },
    { id: 'o2', name: 'Option 2', action: () => alert('Option 2!') },
  ],
  optionsIcon: <MenuIcon />,
};
