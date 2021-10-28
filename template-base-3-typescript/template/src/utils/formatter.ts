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
const CIRCLE_SVG = `<svg width="10px" height="10px" fill="#47db99" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
  <circle cx="5" cy="5" r="5"/>
</svg>`;

export function currencyFormatter(value: number): {
  prefix: string;
  value: string;
} {
  return {
    prefix: '$',
    value: Intl.NumberFormat(DEFAULT_LOCALE, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      notation: 'compact',
      compactDisplay: 'short',
    }).format(isNaN(value) ? 0 : value),
  };
}

export const intervalsFormatter = (
  value: number,
  dataIndex: number,
  ticks: number[],
): string => {
  const _value = numberFormatter(value);
  if (!ticks || dataIndex === undefined) return _value;
  const intervals = moneyInterval(dataIndex, ticks);
  return `${intervals} <br/> ${CIRCLE_SVG} ${_value}`;
};

export function numberFormatter(value: number): string {
  return Intl.NumberFormat(DEFAULT_LOCALE, {
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
}

const moneyInterval = (dataIndex: number, ticks: number[]): string => {
  const isFirst = dataIndex === 0;
  try {
    if (isFirst || dataIndex === ticks.length) {
      const comparison = isFirst ? '<' : '≥';
      const formattedValue = isFirst
        ? currencyFormatter(ticks[dataIndex])
        : currencyFormatter(ticks[dataIndex - 1]);
      return `${comparison} ${formattedValue.prefix}${formattedValue.value}`;
    } else {
      dataIndex = dataIndex - 1;
      const prevTick = currencyFormatter(ticks[dataIndex]);
      const nextTick = currencyFormatter(ticks[dataIndex + 1]);
      return `${prevTick.prefix}${prevTick.value} — ${nextTick.prefix}${nextTick.value}`;
    }
  } catch {
    throw new Error(
      `You are using an "intervalsFormatter" on a not valid index: ${dataIndex} & for the ticks ${ticks}`,
    );
  }
};
