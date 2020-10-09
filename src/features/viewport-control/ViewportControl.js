import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './ViewportControl.module.css';
import { setViewState } from 'app/cartoSlice';

export function ViewportControl() {
  const viewState = useSelector((state) => state.carto.viewState);
  const dispatch = useDispatch();

  return (
    <div className={styles.ViewportControl}>
      <h3>Viewport</h3>
      <label>
        <input
          type='number'
          value={viewState.longitude}
          onChange={(event) =>
            dispatch(setViewState({ longitude: event.target.valueAsNumber || 0 }))
          }
        ></input>
        Longitude
      </label>
      <label>
        <input
          type='number'
          value={viewState.latitude}
          onChange={(event) =>
            dispatch(setViewState({ latitude: event.target.valueAsNumber || 0 }))
          }
        ></input>
        Latitude
      </label>
      <label>
        <input
          type='range'
          min='1'
          max='21'
          step='0.5'
          value={viewState.zoom}
          onChange={(event) =>
            dispatch(setViewState({ zoom: event.target.valueAsNumber }))
          }
        ></input>
        Zoom
      </label>
      <label>
        <input
          type='range'
          min='0'
          max='60'
          value={viewState.pitch}
          onChange={(event) =>
            dispatch(setViewState({ pitch: event.target.valueAsNumber }))
          }
        ></input>
        Pitch
      </label>
      <label>
        <input
          type='range'
          min='0'
          max='360'
          value={viewState.bearing}
          onChange={(event) =>
            dispatch(setViewState({ bearing: event.target.valueAsNumber }))
          }
        ></input>
        Bearing
      </label>
    </div>
  );
}
