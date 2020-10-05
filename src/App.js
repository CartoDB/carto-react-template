import React from 'react';
import { Map } from './features/map/Map';
import { ActionsPanel } from './features/actions-panel/ActionsPanel';
import { RightPanel } from './features/right-panel/RightPanel';
import './App.css';

function App() {
  return (
    <div className="App">
      <Map />
      <ActionsPanel />
      <RightPanel />
    </div>
  );
}

export default App;
