import React from 'react';
import HistogramWidgetUI from '../../widgets/HistogramWidgetUI';

// This default export determines where your story goes in the story list
export default {
  title: 'Widgets/HistogramWidgetUI',
  component: HistogramWidgetUI,
};

const DATA = [220, 350, 1900, 900, 630, 100];

const DATA_AXIS = ['1000', '2000', '3000', '4000', '5000', '6000'];

const Template = (args) => <HistogramWidgetUI {...args} />;

export const Empty = Template.bind({});
Empty.args = {
  name: 'STORE',
  data: DATA,
  dataAxis: DATA_AXIS,
  selectedBars: [],
};

export const Simple = Template.bind({});
Simple.args = {
  name: 'STORE',
  data: DATA,
  onSelectedBarsChange: (event) => {
    console.log(event);
  },
  selectedBars: [],
  dataAxis: DATA_AXIS,
  tooltipFormatter: ([serie]) => serie.value + ' $',
};

export const xAxisFormatter = Template.bind({});
xAxisFormatter.args = {
  name: 'STORE',
  data: DATA,
  dataAxis: DATA_AXIS,
  xAxisFormatter: (v) => `${v / 1000}k`,
  tooltipFormatter: ([serie]) => serie.value + ' $',
};

export const yAxisFormatter = Template.bind({});
yAxisFormatter.args = {
  name: 'STORE',
  data: DATA,
  dataAxis: DATA_AXIS,
  yAxisFormatter: (v) => `${v / 1000}k`,
  tooltipFormatter: ([serie]) => serie.value + ' $',
};

export const Filtered = Template.bind({});
Filtered.args = {
  name: 'STORE',
  data: DATA,
  dataAxis: DATA_AXIS,
  selectedBars: [1, 2],
  tooltipFormatter: ([serie]) => serie.value + ' $',
  onSelectedBarsChange: (event) => {
    // Do nothing
  },
};
