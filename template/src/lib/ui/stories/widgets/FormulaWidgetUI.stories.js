import React from 'react';
import FormulaWidgetUI from '../../widgets/FormulaWidgetUI';

export default {
  title: 'Widgets/FormulaWidgetUI',
  component: FormulaWidgetUI,
  argTypes: {
    formatter: {
      table: {
        disable: true,
      },
    },
  },
};

const Template = (args) => <FormulaWidgetUI {...args} />;

export const Empty = Template.bind({});
Empty.args = {};

export const Text = Template.bind({});
Text.args = { data: '$1000000' };

export const ValueUnit = Template.bind({});
ValueUnit.args = { data: { value: 1000000, unit: '$' } };

export const FormatterText = Template.bind({});
FormatterText.args = { data: 1000000, formatter: (v) => `$${v}` };

export const FormatterValueUnit = Template.bind({});
FormatterValueUnit.args = { data: 1000000 };

export const FormatterValueUnitBefore = Template.bind({});
FormatterValueUnitBefore.args = {
  data: 1000000,
  unitBefore: true,
};
