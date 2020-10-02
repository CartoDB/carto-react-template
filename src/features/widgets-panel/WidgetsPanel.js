import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { CategoryWidget } from '../../lib/widgets/CategoryWidget';
import { AggregationTypes } from '../map/data-views/AggregationTypes';
import { categoryQueryGlobal } from '../map/data-views/CategoryDataView'

import styles from './WidgetsPanel.module.css';


export function WidgetsPanel() {

  const [categoryData, setCategoryData] = useState([]);

  const categoryProps = {
    dataSource: 'countriesSource',
    column: 'continent',
    operationColumn: 'pop_est',
    operation: AggregationTypes.SUM
  }
  const categoryQuery = useSelector(state => categoryQueryGlobal(state, categoryProps))

  useEffect(() => {
     const load = async () => {
       setCategoryData(
         (await (await fetch(categoryQuery)).json()).rows
       );
     }
     load();
  }, [categoryQuery]);


  return (
    <div className={styles.widgets_panel}>
      <CategoryWidget data={categoryData}/>
    </div>
  );
}
