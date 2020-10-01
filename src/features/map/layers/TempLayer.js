import { useSelector } from 'react-redux';
import { CartoSQLLayer } from '@deck.gl/carto';

export function TempLayer () {
  const id = 'temp'
  const dataSources = useSelector(state => state.map.dataSources)

  const POINT_COLORS = {
    COLOR_1: [4, 82, 117],
    COLOR_2: [3, 102, 132],
    COLOR_3: [4, 123, 144],
    COLOR_4: [8, 144, 153],
    COLOR_5: [56, 164, 158],
    COLOR_6: [90, 184, 161],
    COLOR_7: [124, 203, 162],
    COLOR_8: [164, 221, 164],
    COLOR_9: [205, 238, 168],
    OTHER: [247, 254, 174],
  };

  if (dataSources[id]) {
    return new CartoSQLLayer ({
      id: id,
      data: dataSources[id].data,
      getFillColor: (object) => {
        if (object.properties.value > 100) {
          return POINT_COLORS.COLOR_1;
        } else if (object.properties.value > 96) {
          return POINT_COLORS.COLOR_2;
        } else if (object.properties.value > 93) {
          return POINT_COLORS.COLOR_3;
        } else if (object.properties.value > 90) {
          return POINT_COLORS.COLOR_4;
        } else if (object.properties.value > 86) {
          return POINT_COLORS.COLOR_5;
        } else if (object.properties.value > 83) {
          return POINT_COLORS.COLOR_6;
        } else if (object.properties.value > 80) {
          return POINT_COLORS.COLOR_7;
        } else if (object.properties.value > 76) {
          return POINT_COLORS.COLOR_8;
        } else if (object.properties.value > 73) {
          return POINT_COLORS.COLOR_9;
        } else {
          return POINT_COLORS.OTHER;
        }
      },
      pointRadiusMinPixels: 2,
      pickable: true,
    })
  }
}
