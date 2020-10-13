import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSourceById, addFilter } from 'config/cartoSlice';
import { FilterTypes } from 'lib/models/FitlerConditionBuilder';
import { getCategories } from 'lib/models/CategoryModel';
import { CategoryWidgetUI } from 'lib/widgets/CategoryWidgetUI';

export function CategoryWidget(props) {
  const { column } = props;
  const [categoryData, setCategoryData] = useState([]);
  const dispatch = useDispatch();
  const source = useSelector((state) => selectSourceById(state, props['data-source']));
  const { data, credentials, filters } = source;
  const { filters: _filters = {} } = source,
    { [column]: _column = {} } = _filters,
    { [FilterTypes.IN]: selectedCategories = [] } = _column;

  useEffect(() => {
    if (data && credentials) {
      getCategories({ ...props, data, filters, credentials }).then((data) =>
        setCategoryData(data)
      );
    } else {
      setCategoryData([]);
    }
  }, [credentials, data, filters, props]);

  const handleSelectedCategoriesChange = (categories) => {
    dispatch(
      addFilter({
        id: props['data-source'],
        column,
        type: FilterTypes.IN,
        values: categories,
      })
    );
  };

  return (
    <div>
      <CategoryWidgetUI
        data={categoryData}
        selectedCategories={selectedCategories}
        onSelectedCategoriesChange={handleSelectedCategoriesChange}
      />
    </div>
  );
}
