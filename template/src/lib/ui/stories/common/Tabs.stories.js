import React from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { Layers, LocalOffer, Map, Place, Store } from '@material-ui/icons';

export default {
  title: 'Common/Tabs',
  component: Tabs,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['standard', 'filled', 'outlined'],
      },
    },
    indicatorColor: {
      default: 'primary',
      control: {
        type: 'select',
        options: ['default', 'primary', 'secondary'],
      },
    },
    textColor: {
      control: {
        type: 'select',
        options: ['default', 'primary', 'secondary'],
      },
    },
  },
};

const Template = ({ ...args }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} aria-label='tabs example' {...args}>
      <Tab label='Maps' />
      <Tab label='Layers' />
      <Tab label='Tag' />
      <Tab label='POIs' />
      <Tab label='Stores' disabled />
    </Tabs>
  );
};

const TemplateOnlyIcons = ({ ...args }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} aria-label='tabs example' {...args}>
      <Tab icon={<Map />} />
      <Tab icon={<Layers />} />
      <Tab icon={<LocalOffer />} />
      <Tab icon={<Place />} />
      <Tab icon={<Store />} disabled />
    </Tabs>
  );
};

const TemplateIconsLabels = ({ ...args }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} aria-label='tabs example' {...args}>
      <Tab label='Maps' icon={<Map />} />
      <Tab label='Layers' icon={<Layers />} />
      <Tab label='Tag' icon={<LocalOffer />} />
      <Tab label='POIs' icon={<Place />} />
      <Tab label='Stores' icon={<Store />} disabled />
    </Tabs>
  );
};

export const Playground = Template.bind({});
export const OnlyIcons = TemplateOnlyIcons.bind({});
export const IconsLabels = TemplateIconsLabels.bind({});
