import React from 'react';
import Home from './pages/Home/Home';
import Kpis from './pages/Kpis/Kpis';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/kpis', element: <Kpis /> },
];

export default routes;
