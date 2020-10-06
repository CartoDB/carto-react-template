import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCategories } from 'lib/models/CategoryModel'
import { CategoryWidgetUI } from 'lib/widgets/CategoryWidgetUI';

export function CategoryWidget(props) {
  const [categoryData, setCategoryData] = useState([]);
  const source = useSelector(state => state.map.dataSources[props['data-source']]);

  useEffect(() => {
    if (source) {
      getCategories({ ...props, source }).then(data => setCategoryData(data))
    } else {
      setCategoryData([])
    }
  }, [props, source]);

  return (
    <CategoryWidgetUI data={categoryData}/>
  );
}
