import React from 'react';
import { AggregationTypes } from 'lib/models/AggregationTypes';
import { CategoryWidget } from '../widgets/CategoryWidget'
import styles from './LeftPanel.module.css';


export function LeftPanel(props) {
  return (
    <div className={styles.left_panel}>
      <CategoryWidget
        data-source="countriesSource"
        column="continent"
        operation-column="pop_est"
        operation={AggregationTypes.SUM}
      />
    </div>
  );
}
