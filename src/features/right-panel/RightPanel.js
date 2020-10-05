import React from 'react';
import { AggregationTypes } from '../../lib/models/AggregationTypes';
import { CategoryWidget } from '../widgets/CategoryWidget'
import styles from './RightPanel.module.css';


export function RightPanel(props) {
  return (
    <div className={styles.right_panel}>
      <CategoryWidget
        data-source="countriesSource"
        column="continent"
        operation-column="pop_est"
        operation={AggregationTypes.SUM}
      />
    </div>
  );
}
