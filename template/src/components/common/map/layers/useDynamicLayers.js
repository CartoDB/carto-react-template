import { useSelector } from 'react-redux';
import { CartoSQLLayer } from '@deck.gl/carto';

function useDynamicLayers() {
  const sources = useSelector((state) => state.carto.dataSources);

  const dynamicLayers = useSelector((state) => {
    const dynamic = Object.values(state.carto.layers).filter((layer) => layer.dynamic);
    const layersWithDataSources = dynamic.map((layer) => {
      const id = layer.id;
      const { data, credentials } = sources[layer.source];
      return { id, data, credentials };
    });
    return layersWithDataSources;
  });

  const deckLayers = dynamicLayers.map((layer) => {
    return new CartoSQLLayer({
      id: layer.id,
      data: layer.data,
      credentials: layer.credentials,

      pickable: true,
      autohighlight: true,
      stroked: true,
      filled: true,
      lineWidthMinPixels: 2,
      getFillColor: [255, 0, 0, 30],
      getLineColor: [255, 0, 0],
      getRadius: 50,
      pointRadiusMinPixels: 4,
      getLineWidth: 1,
      onHover: (info) => {
        if (info && info.object) {
          info.object = {
            html: `<strong>${layer.id}</strong>: ${info.object.properties.cartodb_id}`,
            style: {
              backgroundColor: '#fff',
              fontFamily: 'Open Sans',
              fontSize: '14px',
              color: '#000',
              boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
              borderRadius: '4px',
              top: '-18px',
              left: '20px',
              padding: '12px',
            },
          };
        }
      },
    });
  });

  return deckLayers;
}

export default useDynamicLayers;
