import React from 'react';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core';
import { cartoOptions } from '../theme/carto-theme';

let theme = createMuiTheme(cartoOptions);
theme = responsiveFontSizes(theme, {
  breakpoints: cartoOptions.breakpoints.keys,
  disableAlign: false,
  factor: 2,
  variants: [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
    'button',
    'caption',
    'overline',
  ],
});

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewMode: 'docs',
  options: {
    storySort: {
      order: [
        'Introduction',
        'Getting Started',
        ['Palette', 'Typography'],
        'Common',
        'Widgets',
        ['WrapperWidgetUI', 'FormulaWidgetUI', 'CategoryWidgetUI'],
      ],
    },
  },
};
