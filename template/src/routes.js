import React from 'react';
import Home from './components/views/Home/Home';
import Kpis from './components/views/Kpis/Kpis';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/kpis', element: <Kpis /> },
];

export default routes;
