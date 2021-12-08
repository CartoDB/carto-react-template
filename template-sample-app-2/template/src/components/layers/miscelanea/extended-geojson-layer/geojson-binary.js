// This module implement some utility functions to work with
// the geojson-binary format defined at loaders.gl:
// https://github.com/visgl/loaders.gl/blob/master/modules/gis/docs/api-reference/geojson-to-binary.md

// Custom picking color to keep binary indexes
export function calculatePickingColors(geojsonBinary, encodePickingColor) {
  const pickingColors = {
    points: null,
    lines: null,
    polygons: null,
  };
  for (const key in pickingColors) {
    const featureIds = geojsonBinary[key].globalFeatureIds.value;
    pickingColors[key] = new Uint8ClampedArray(featureIds.length * 3);
    const pickingColor = [];
    for (let i = 0; i < featureIds.length; i++) {
      encodePickingColor(featureIds[i], pickingColor);
      pickingColors[key][i * 3 + 0] = pickingColor[0];
      pickingColors[key][i * 3 + 1] = pickingColor[1];
      pickingColors[key][i * 3 + 2] = pickingColor[2];
    }
  }

  return pickingColors;
}
