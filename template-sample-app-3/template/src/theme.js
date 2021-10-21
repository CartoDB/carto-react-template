import deepmerge from 'deepmerge';
import { createTheme } from '@material-ui/core';
import { cartoThemeOptions } from '@carto/react-ui';

const customTheme = {};

const theme = createTheme(deepmerge(cartoThemeOptions, customTheme));

export default theme;
