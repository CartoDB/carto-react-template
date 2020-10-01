import React from "react";
import { Map } from "./features/map/Map";
import { ActionsPanel } from "./features/actions-panel/ActionsPanel";
import { BasemapSelector } from "./features/basemap-selector/BasemapSelector";
import { ViewportControl } from "./features/viewport-control/ViewportControl";

import styles from "./App.module.css";

function App() {
  return (
    <div className="App">
      <Map />
      <div className={styles.MapPanel}>
        <BasemapSelector />
        <ViewportControl />
        <ActionsPanel />
      </div>
    </div>
  );
}

export default App;
