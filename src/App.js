import React from "react";
import { Map } from "./features/map/Map";
import styles from "./App.module.css";
import { BasemapSelector } from "./features/basemapSelector/BasemapSelector";
import { ViewportControl } from "./features/viewportControl/ViewportControl";

function App() {
  return (
    <div>
      <Map />
      <div className={styles.MapPanel}>
        <BasemapSelector />
        <ViewportControl />
      </div>
    </div>
  );
}

export default App;
