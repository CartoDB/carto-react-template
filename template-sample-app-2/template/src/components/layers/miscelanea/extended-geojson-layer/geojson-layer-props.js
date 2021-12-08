import { calculatePickingColors } from './geojson-binary';

function createEmptyLayerProps() {
  return {
    points: {},
    lines: {},
    polygons: {},
    polygonsOutline: {},
  };
}

export function createLayerPropsFromBinary(geojsonBinary, encodePickingColor) {
  const layerProps = createEmptyLayerProps();
  const { points, lines, polygons } = geojsonBinary;

  const customPickingColors = calculatePickingColors(geojsonBinary, encodePickingColor);

  layerProps.points.data = {
    length: points.positions.value.length / points.positions.size,
    attributes: {
      ...points.attributes,
      getPosition: points.positions,
      instancePickingColors: {
        size: 3,
        value: customPickingColors.points,
      },
    },
    properties: points.properties,
    numericProps: points.numericProps,
    featureIds: points.featureIds,
  };

  layerProps.lines.data = {
    length: lines.pathIndices.value.length - 1,
    startIndices: lines.pathIndices.value,
    attributes: {
      ...lines.attributes,
      getPath: lines.positions,
      instancePickingColors: {
        size: 3,
        value: customPickingColors.lines,
      },
    },
    properties: lines.properties,
    numericProps: lines.numericProps,
    featureIds: lines.featureIds,
  };
  layerProps.lines._pathType = 'open';

  layerProps.polygons.data = {
    length: polygons.polygonIndices.value.length - 1,
    startIndices: polygons.polygonIndices.value,
    attributes: {
      ...polygons.attributes,
      getPolygon: polygons.positions,
      pickingColors: {
        size: 3,
        value: customPickingColors.polygons,
      },
    },
    properties: polygons.properties,
    numericProps: polygons.numericProps,
    featureIds: polygons.featureIds,
  };
  layerProps.polygons._normalize = false;
  if (polygons.triangles) {
    layerProps.polygons.data.attributes.indices = polygons.triangles.value;
  }

  layerProps.polygonsOutline.data = {
    length: polygons.primitivePolygonIndices.value.length - 1,
    startIndices: polygons.primitivePolygonIndices.value,
    attributes: {
      ...polygons.attributes,
      getPath: polygons.positions,
      instancePickingColors: {
        size: 3,
        value: customPickingColors.polygons,
      },
    },
    properties: polygons.properties,
    numericProps: polygons.numericProps,
    featureIds: polygons.featureIds,
  };
  layerProps.polygonsOutline._pathType = 'open';

  return layerProps;
}
