import React from 'react';
import { Map } from 'components/common/map/Map';
import { ActionsPanel } from 'components/common/actions-panel/ActionsPanel';
import { LeftPanel } from 'components/common/left-panel/LeftPanel';
import { BasemapSelector } from 'components/common/basemap-selector/BasemapSelector';
import { ViewportControl } from 'components/common/viewport-control/ViewportControl';

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
