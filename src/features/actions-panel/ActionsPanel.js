import React from 'react';
import { useDispatch } from 'react-redux';
import { addLayer, removeLayer, addDataSource, removeDataSource } from 'app/cartoSlice';

import styles from './ActionsPanel.module.css';

export function ActionsPanel() {
  const dispatch = useDispatch();

  const addTempLayer = () => {
    dispatch(addLayer({ id: 'tempLayer', source: 'tempSource' }));
  };

  const addLayerTips = () => {
    dispatch(addLayer({ id: 'tipsLayer', source: 'tipsSource' }));
  };

  const handleRemoveLayer = (e) => {
    dispatch(removeLayer(e.target.value));
  };

  const addTempDataSource = () => {
    dispatch(addDataSource({ id: 'tempSource', data: 'SELECT * FROM temps' }));
  };

  const addTipsDataSource = () => {
    dispatch(
      addDataSource({ id: 'tipsSource', data: 'cartobq.maps.nyc_taxi_points_demo_id' })
    );
  };

  const handleRemoveDataSource = (e) => {
    dispatch(removeDataSource(e.target.value));
  };

  return (
    <div className={styles.actions_panel}>
      <div>
        <h3>Layers</h3>
        <button onClick={addTempLayer}>Add Temp Layer</button>
        <button onClick={addLayerTips}>Add Tips Layer</button>
        <button value='tempLayer' onClick={handleRemoveLayer}>
          Remove Temp Layer
        </button>
        <button value='tipsLayer' onClick={handleRemoveLayer}>
          Remove Tips Layer
        </button>
      </div>

      <div>
        <h3>Sources</h3>
        <button onClick={addTempDataSource}>Add Temp Source</button>
        <button onClick={addTipsDataSource}>Add Tips Source</button>
        <button value='tempSource' onClick={handleRemoveDataSource}>
          Remove Temp Source
        </button>
        <button value='tipsSource' onClick={handleRemoveDataSource}>
          Remove Tips Soruce
        </button>
      </div>
    </div>
  );
}
