import deepmerge from 'deepmerge';
import { createTheme } from '@mui/material';
import { cartoThemeOptions } from '@carto/react-ui';

const customTheme = {};

const theme = createTheme(deepmerge(cartoThemeOptions, customTheme));

export default theme;
