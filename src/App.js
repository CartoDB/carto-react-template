import React from 'react';
import { Map } from './features/map/Map';
import { ActionsPanel } from './features/actions-panel/ActionsPanel';
import { WidgetsPanel } from './features/widgets-panel/WidgetsPanel';
import './App.css';

function App() {
  return (
    <div className="App">
      <Map />
      <ActionsPanel />
      <WidgetsPanel />
    </div>
  );
}

export default App;
