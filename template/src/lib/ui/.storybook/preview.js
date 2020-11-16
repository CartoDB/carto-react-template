import React from 'react';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core';
import { cartoThemeOptions } from '../theme/carto-theme';

let theme = createMuiTheme(cartoThemeOptions);
theme = responsiveFontSizes(theme, {
  breakpoints: cartoThemeOptions.breakpoints.keys,
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
  docs: {
    source: {
      type: 'code',
    },
  },
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
