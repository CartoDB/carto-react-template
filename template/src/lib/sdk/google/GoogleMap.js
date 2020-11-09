import React, { useEffect, useRef } from 'react';
import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { debounce } from '..';
import styles from './GoogleMap.module.css';

export function GoogleMap(props) {
  const { baseMap, viewState, layers, getTooltip } = props;
  // based on https://publiuslogic.com/blog/google-maps+react-hooks/
  const containerRef = useRef();
  const triggerResize = (map) => {
    window.google.maps.event.trigger(map, 'resize');
  };

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

    const mapNotConnected = containerRef.current.children.length === 0;
    if (!window.cartoGmap || mapNotConnected) {
      const map = new window.google.maps.Map(containerRef.current, options);
      const deckOverlay = new GoogleMapsOverlay({ layers, getTooltip });

      const handleViewportChange = () => {
        const center = map.getCenter();
        // adapted to common Deck viewState format
        const viewState = {
          longitude: center.lng(),
          latitude: center.lat(),
          zoom: Math.max(map.getZoom() - 1, 1), // cap min zoom level to 1
          pitch: 0, // no pitch or bearing gmaps yet
          bearing: 0,
        };

        if (JSON.stringify(window.cartoViewState) !== JSON.stringify(viewState)) {
          window.cartoViewState = viewState;
          props.onViewStateChange({ viewState });
        }
      };

      const handleViewportChangeDebounced = debounce(handleViewportChange, 200);
      map.addListener('bounds_changed', handleViewportChangeDebounced);
      map.addListener('resize', () => {
        props.onResize({
          height: map.getDiv().offsetHeight,
          width: map.getDiv().offsetWidth,
        });
      });

      window.onresize = () => {
        triggerResize(map);
      };

      triggerResize(map);

      window.cartoGmap = map;
      window.cartoDeck = deckOverlay;
    } else {
      const { center, zoom, ...rest } = options;
      window.cartoGmap.setZoom(zoom);
      window.cartoGmap.setCenter(center);
      window.cartoGmap.setOptions(rest);
      window.cartoDeck.setProps({ layers, getTooltip });
    }

    window.cartoDeck.setMap(window.cartoGmap);
  };

  useEffect(() => {
    if (!document.querySelector('#gmaps')) {
      const script = document.createElement(`script`);
      script.id = 'gmaps';
      script.async = true;
      script.type = `text/javascript`;
      script.src = `https://maps.google.com/maps/api/js?key=` + baseMap.apiKey;
      const headScript = document.getElementsByTagName(`script`)[0];
      headScript.parentNode.insertBefore(script, headScript);
      script.addEventListener(`load`, onLoad);
    } else if (document.querySelector('#gmaps') && window.google) {
      onLoad();
    }
  });

  return <div ref={containerRef} className={styles.GoogleMap}></div>;
}
