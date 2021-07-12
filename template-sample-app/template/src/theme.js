import deepmerge from 'deepmerge';
import { createMuiTheme } from '@material-ui/core';
import { cartoThemeOptions } from '@carto/react-ui';

const customTheme = {};

const theme = createMuiTheme(deepmerge(cartoThemeOptions, customTheme));

export default theme;
