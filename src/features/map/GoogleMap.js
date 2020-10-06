import React, { createRef, useEffect } from 'react';
import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import styles from './GoogleMap.module.css';

export function GoogleMap(props) {
  const { baseMap, viewState, layers } = props;
  // based on https://publiuslogic.com/blog/google-maps+react-hooks/
  const containerRef = createRef();

  const onLoad = () => {
    // gmaps
    let options = {
      center: {
        lat: viewState.latitude,
        lng: viewState.longitude,
      },
      zoom: viewState.zoom + 1, // notice the 1 zoom level difference relative to deckgl
      ...baseMap.options,
    };

    if (!window.cartoGmap) {
      const map = new window.google.maps.Map(containerRef.current, options);
      const deckOverlay = new GoogleMapsOverlay({ layers });

      const handleViewportChange = () => {
        const center = map.getCenter();
        const viewState = {
          longitude: center.lng(),
          latitude: center.lat(),
          zoom: map.getZoom() - 1,
          pitch: 0,
          bearing: 0,
        };
        props.onViewStateChange({ viewState }); // adapted to common Deck viewState format
      };

      const handleViewportChangeDebounced = debounce(handleViewportChange, 200);
      map.addListener('bounds_changed', handleViewportChangeDebounced);

      // keep references for further updates
      window.cartoGmap = map;
      window.cartoDeck = deckOverlay;
    } else {
      const { center, zoom, ...rest } = options;
      window.cartoGmap.setZoom(zoom);
      window.cartoGmap.setCenter(center);
      window.cartoGmap.setOptions(rest);
      window.cartoDeck.setProps({ layers });
    }

    window.cartoDeck.setMap(window.cartoGmap);
  };

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement(`script`);
      script.type = `text/javascript`;
      script.src = `https://maps.google.com/maps/api/js?key=` + baseMap.apiKey;
      const headScript = document.getElementsByTagName(`script`)[0];
      headScript.parentNode.insertBefore(script, headScript);
      script.addEventListener(`load`, onLoad);
      return () => script.removeEventListener(`load`, onLoad);
    } else onLoad();
  });

  return <div ref={containerRef} className={styles.GoogleMap}></div>;
}

function debounce(fn, ms) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}
