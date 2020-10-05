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
      zoom: viewState.zoom + 1,
      ...baseMap.options,
    };

    const map = new window.google.maps.Map(containerRef.current, options);

    // deck
    const deckOverlay = new GoogleMapsOverlay({ layers });
    deckOverlay.setMap(map);
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
