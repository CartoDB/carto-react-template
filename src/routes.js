import React from 'react';
import Home from './components/views/Home/Home';
import Kpis from './components/views/Kpis/Kpis';
import Components from './components/views/Components/Components';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/kpis', element: <Kpis /> },
  { path: '/components', element: <Components /> },
];

export default routes;
