import { currencyFormatter, numberFormatter } from 'utils/formatter';

const FORMATTER_TYPES = Object.freeze({
  CURRENCY: 'currency',
  NUMBER: 'number',
});

const formatterFunctions = {
  [FORMATTER_TYPES.CURRENCY](value) {
    const formatted = currencyFormatter(value);
    return `${formatted.prefix}${formatted.value}`;
  },
  [FORMATTER_TYPES.NUMBER](value) {
    return numberFormatter(value);
  },
};

const DEFAULT_FORMATTER = {
  type: '',
  columns: [],
};

export default function htmlForFeature({
  title,
  feature,
  formatter = DEFAULT_FORMATTER,
  includeColumns = '*',
  showColumnName = true,
}) {
  if (!feature) {
    throw new Error(`htmlForFeature needs "info.object" information`);
  }

  const propertyNames = Object.keys(feature.properties);

  if (
    formatter?.type &&
    formatter?.columns &&
    !isFormatterValid(propertyNames, formatter)
  ) {
    return;
  }

  if (!includedColumnsAreValid(propertyNames, includeColumns)) {
    return;
  }

  let html = '';

  if (title) {
    html = `<h3 style="margin: 0"><strong>${title}</strong></h3>`;
  }

  for (const name of propertyNames) {
    if (
      name !== 'layerName' &&
      (includeColumns.includes(name) || includeColumns === '*')
    ) {
      if (formatter?.columns.includes(name)) {
        const formatterFunction = formatterFunctions[formatter.type];
        html = generateHtml(feature, name, showColumnName, html, formatterFunction);
      } else {
        html = generateHtml(feature, name, showColumnName, html);
      }
    }
  }

  return html;
}

function generateHtml(
  feature,
  propertyName,
  showColumnName,
  html,
  formatterFunction = (v) => v
) {
  return html.concat(
    `${showColumnName ? `<strong>${propertyName}</strong>: ` : ''}${formatterFunction(
      feature.properties[propertyName]
    )}<br/>`
  );
}

function isFormatterValid(properties, formatter) {
  const supportedTypes = Object.values(FORMATTER_TYPES);

  if (!supportedTypes.includes(formatter.type)) {
    throw new Error(
      `"${formatter.type}" is not supported as formatter, use one of "${supportedTypes}"`
    );
  }

  if (!formatter.columns || formatter.columns.length === 0) return true;

  if (!isArrayOfStrings(formatter.columns)) {
    throw new Error(`"formatter.columns" property needs to be an array of strings`);
  }

  for (const column of formatter.columns) {
    if (!properties.includes(column)) {
      const available = properties.join(', ');
      throw new Error(
        `"formatted.columns" includes '${column}' but it was not found!. Available cols are [${available}]`
      );
    }
  }

  return true;
}

function includedColumnsAreValid(properties, includeColumns) {
  if (includeColumns === '*') {
    return true;
  }

  if (!isArrayOfStrings(includeColumns)) {
    throw new Error(
      `"includeColumns" property needs to be an array of existing feature columns or "*"`
    );
  }

  if (isArrayOfStrings(includeColumns)) {
    for (const column of includeColumns) {
      if (!properties.includes(column)) {
        throw new Error('colums set in "includeColumns" should exist in picked feature');
      }
    }
  }

  return true;
}

function isArrayOfStrings(value) {
  return Array.isArray(value) && value.length && value.every(String);
}
