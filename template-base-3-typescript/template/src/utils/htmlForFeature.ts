import { Feature, GeoJsonProperties } from 'geojson';
import { currencyFormatter, numberFormatter } from 'utils/formatter';

const FORMATTER_TYPES = Object.freeze({
  CURRENCY: 'currency',
  NUMBER: 'number',
});

const formatterFunctions = {
  [FORMATTER_TYPES.CURRENCY](value: number) {
    const formatted = currencyFormatter(value);
    return `${formatted.prefix}${formatted.value}`;
  },
  [FORMATTER_TYPES.NUMBER](value: number) {
    return numberFormatter(value);
  },
};

const DEFAULT_FORMATTER: {
  type: string;
  columns: Array<string>;
} = {
  type: '',
  columns: [],
};

export interface HtmlForFeature {
  title: string;
  feature: Feature;
  formatter: typeof DEFAULT_FORMATTER;
  includeColumns: Array<string> | string;
  showColumnName: Boolean;
}

export default function htmlForFeature({
  title,
  feature,
  formatter = DEFAULT_FORMATTER,
  includeColumns = '*',
  showColumnName = true,
}: HtmlForFeature) {
  if (!feature) {
    throw new Error(`htmlForFeature needs "info.object" information`);
  }

  //@ts-ignore
  const propertyNames: Array<string> = Object.keys(feature.properties);

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
  feature: Feature,
  propertyName: string,
  showColumnName: Boolean,
  html: string,
  formatterFunction = (v: number) => v.toString()
): string {
  return html.concat(
    `${showColumnName ? `<strong>${propertyName}</strong>: ` : ''}${formatterFunction(
      feature.properties ? feature.properties[propertyName] : ''
    )}<br/>`
  );
}

function isFormatterValid(
  properties: GeoJsonProperties,
  formatter: typeof DEFAULT_FORMATTER
) {
  const supportedTypes = Object.values(FORMATTER_TYPES);

  if (!supportedTypes.includes(formatter.type)) {
    throw new Error(
      `"${formatter.type}" is not supported as formatter, use one of "${supportedTypes}"`
    );
  }

  if (!isArrayOfStrings(formatter.columns)) {
    throw new Error(`"formatter.columns" property needs to be an array of strings`);
  }

  for (const column of formatter.columns) {
    if (!properties?.includes(column)) {
      const available = properties?.join(', ');
      throw new Error(
        `"formatted.columns" includes '${column}' but it was not found!. Available cols are [${available}]`
      );
    }
  }

  return true;
}

function includedColumnsAreValid(
  properties: GeoJsonProperties,
  includeColumns: Array<string> | string
) {
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
      if (!properties?.includes(column)) {
        throw new Error('colums set in "includeColumns" should exist in picked feature');
      }
    }
  }

  return true;
}

function isArrayOfStrings(value: Array<string> | string) {
  return Array.isArray(value) && value.length && value.every(String);
}
