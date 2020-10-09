---
to: src/features/<%= name %>/<%= h.changeCase.pascalCase(name) %>.stories.js
---
<% const comp = h.changeCase.pascalCase(name) -%>
import React from 'react';
import { <%= comp %> } from './<%= comp %>';

export default {
  title: 'Example/<%= comp %>',
  component: <%= comp %>,
};

const Template = (args) => <<%= comp %> {...args} />;

export const Default = Template.bind({});

Default.args = {
  /* the args you need here will depend on your component */
};