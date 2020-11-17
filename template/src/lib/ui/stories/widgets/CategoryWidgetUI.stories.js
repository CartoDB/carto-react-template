import React from 'react';
import CategoryWidgetUI from '../../widgets/CategoryWidgetUI';

export default {
  title: 'Widgets/CategoryWidgetUI',
  component: CategoryWidgetUI,
  argTypes: {
    selectedCategories: {
      table: { disable: true },
    },
    onSelectedCategoriesChange: {
      table: { disable: true },
    },
    order: {
      defaultValue: 'ranking',
      control: {
        type: 'select',
        options: ['ranking', 'fixed'],
      },
    },
  },
};

const Template = (args) => <CategoryWidgetUI {...args}></CategoryWidgetUI>;
const data = [
  { category: 'categoryA', value: 100 },
  { category: 'categoryB', value: 120 },
  { category: 'categoryC', value: 150 },
  { category: 'categoryD', value: 90 },
  { category: 'categoryE', value: 200 },
  { category: 'categoryF', value: 20 },
  { category: 'categoryG', value: 90 },
];

const dataFiltered = [
  { category: 'categoryA', value: null },
  { category: 'categoryB', value: 120 },
  { category: 'categoryC', value: 100 },
  { category: 'categoryD', value: null },
];

export const Default = Template.bind({});
Default.args = { data };

export const OnlyData = Template.bind({});
OnlyData.args = { data };

export const WithFormatter = Template.bind({});
WithFormatter.args = { data };

export const WithCustomLabels = Template.bind({});
WithCustomLabels.args = {
  data,
  labels: {
    categoryA: 'Cat. A',
    categoryB: 'Cat. B',
    categoryC: 'Cat. C',
    categoryD: 'Cat. D',
  },
};

export const WithSelectedCategories = Template.bind({});
WithSelectedCategories.args = {
  data: dataFiltered,
  selectedCategories: ['categoryB', 'categoryC'],
  onSelectedCategoriesChange: (categories) => console.log(categories),
};
