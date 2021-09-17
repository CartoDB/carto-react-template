// int-numberformat dependencies (support for ios v13)
import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-getcanonicallocales/polyfill';

// int-pluralrules dependencies (support for ios v12)
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/en';

/*
  Note: `notation` & `compactDisplay` properties are not supported yet by Safari.
  Those require the use of a polyfill: https://www.npmjs.com/package/@formatjs/intl-numberformat
*/
import '@formatjs/intl-numberformat/polyfill';
import '@formatjs/intl-numberformat/locale-data/en';

const DEFAULT_LOCALE = 'en-US';

export const currencyFormatter = (value) => {
  return {
    prefix: '$',
    value: Intl.NumberFormat(DEFAULT_LOCALE, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      notation: 'compact',
      compactDisplay: 'short',
    }).format(isNaN(value) ? 0 : value),
  };
};

export const numberFormatter = (value) => {
  const _value = parseLogicalOperation(value);
  return (
    _value.operation +
    Intl.NumberFormat(DEFAULT_LOCALE, {
      maximumFractionDigits: 1,
      minimumFractionDigits: 0,
      notation: 'compact',
      compactDisplay: 'short',
    }).format(_value.value)
  );
};

const parseLogicalOperation = (value) => {
  if (!isNaN(value)) return { value, operation: '' };

  try {
    const _value = value.replace('>', '');
    return isNaN(_value)
      ? { value: 0, operation: '' }
      : { value: _value, operation: '> ' };
  } catch {
    throw new Error(`You are using a numberFormatter on a not valid value: ${value}`);
  }
};
