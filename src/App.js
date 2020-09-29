import React from 'react';
import { Map } from './features/map/Map';
import './App.css';
import { BasemapSelector } from './features/basemapSelector/BasemapSelector';

function App() {
  return (
    <div className="App">
      <Map />
      <BasemapSelector/>
    </div>
  );
}

export default App;
