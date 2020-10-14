import React from 'react';
import { Map } from '../../features/map/Map';
import { ActionsPanel } from '../../features/actions-panel/ActionsPanel';
import { LeftPanel } from '../../features/left-panel/LeftPanel';
import { BasemapSelector } from '../../features/basemap-selector/BasemapSelector';
import { ViewportControl } from '../../features/viewport-control/ViewportControl';

import styles from './Home.module.css';

function Home() {
  return (
    <div className='Home'>
      <Map />
      <div className={styles.MapPanel}>
        <BasemapSelector />
        <ViewportControl />
        <ActionsPanel />
        <LeftPanel />
      </div>
    </div>
  );
}

export default Home;
