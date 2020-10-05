import React from 'react';
import { AggregationTypes } from '../../lib/models/AggregationTypes';
import { CategoryWidget } from '../widgets/CategoryWidget'
import styles from './WidgetsPanel.module.css';


export function WidgetsPanel(props) {
  return (
    <div className={styles.widgets_panel}>
      <CategoryWidget
        data-source="countriesSource"
        column="continent"
        operation-column="pop_est"
        operation={AggregationTypes.SUM}
      />
    </div>
  );
}
