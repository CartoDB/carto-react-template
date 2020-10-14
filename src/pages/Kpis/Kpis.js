import React from 'react';
import { Map } from '../../features/map/Map';
import { Typography } from '@material-ui/core';

import styles from './Kpis.module.css';

function Kpis() {
  return (
    <div className='Kpis'>
      <Map />
      <div className={styles.MapPanel}>
        <Typography color='primary' variant='h1'>
          This is KPIs page!
        </Typography>
      </div>
    </div>
  );
}

export default Kpis;
