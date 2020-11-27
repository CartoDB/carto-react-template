// int-numberformat dependencies (support for ios v13)
import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-getcanonicallocales/polyfill';

/* 
  Note: `notation` & `compactDisplay` properties are not supported yet by Safari. 
  Those require the use of a polyfill: https://www.npmjs.com/package/@formatjs/intl-numberformat
*/
import '@formatjs/intl-numberformat/polyfill';
import '@formatjs/intl-numberformat/locale-data/en';

export const currencyFormatter = (value) => {
  return {
    prefix: '$',
    value: Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      notation: 'compact',
      compactDisplay: 'short',
    }).format(isNaN(value) ? 0 : value),
  };
};

export const numberFormatter = (value) => {
  return Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
};
