import deepmerge from 'deepmerge';
import { createTheme, Theme, adaptV4Theme } from '@mui/material';
import { cartoThemeOptions } from '@carto/react-ui';
import { Palette, PaletteColor } from '@mui/material/styles';

export interface CustomTheme extends Theme {
  palette: CustomPalette;
}

interface CustomPalette extends Palette {
  appBar: PaletteColor;
}

const customTheme = {};

const theme = createTheme(adaptV4Theme(deepmerge(cartoThemeOptions, customTheme)));

export default theme as CustomTheme;
