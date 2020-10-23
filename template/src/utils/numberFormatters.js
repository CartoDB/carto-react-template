export const currencyFormatter = (v) => {
  const moneyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const formattedParts = moneyFormatter.formatToParts(v);
  const valueParted = formattedParts.reduce(
    (acum, part) => {
      switch (part.type) {
        case 'currency':
          acum.unit = part.value;
          break;
        case 'integer':
        case 'group':
        case 'decimal':
        case 'fraction':
          acum.value += part.value;
          break;
        default: // do nothing
      }
      return acum;
    },
    { unit: '', value: '' }
  );
  return [valueParted.unit, valueParted.value];
};
