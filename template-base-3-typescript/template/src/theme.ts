import deepmerge from 'deepmerge';
import { createTheme, Theme, ThemeOptions } from '@material-ui/core';
import { cartoThemeOptions } from '@carto/react-ui';
import {
  Palette,
  PaletteColor,
  PaletteColorOptions,
  PaletteOptions,
} from '@material-ui/core/styles/createPalette';

interface CustomPaletteOptions extends PaletteOptions {
  appBar: PaletteColorOptions;
}

interface CustomThemeOptions extends ThemeOptions {
  palette?: CustomPaletteOptions;
}

interface CustomPalette extends Palette {
  appBar: PaletteColor;
}

export interface CustomTheme extends Theme {
  palette: CustomPalette;
}

const customTheme: CustomThemeOptions = {
  palette: {
    appBar: {
      light: '',
      main: '',
      dark: '',
      contrastText: '',
    },
  },
};

const theme = createTheme(deepmerge(cartoThemeOptions, customTheme));

export default theme as CustomTheme;
