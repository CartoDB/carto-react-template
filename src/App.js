import React from 'react';
import { Map } from './features/map/Map';
import { ActionsPanel } from './features/actions-panel/ActionsPanel';
import './App.css';

function App() {
  return (
    <div className="App">
      <Map />
      <ActionsPanel />
    </div>
  );
}

export default App;
