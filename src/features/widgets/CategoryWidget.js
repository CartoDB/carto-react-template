import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSourceById, addFilter } from 'features/map/mapSlice'
import { FilterTypes } from 'lib/models/FilterModel'
import { getCategories } from 'lib/models/CategoryModel'
import { CategoryWidgetUI } from 'lib/widgets/CategoryWidgetUI';

export function CategoryWidget(props) {
  const { column } = props;
  const [categoryData, setCategoryData] = useState([]);
  const dispatch = useDispatch();
  const source = useSelector(state => selectSourceById(state, props['data-source']));
  const { data, credentials, filters } = source
  const sourceWithoutFilters = {...source}
  delete sourceWithoutFilters.filters

  const {
    filters: _filters = {}
  } = source,
  {
    [column]: _column = {}
  } = _filters,
  {
    [FilterTypes.IN]: selectedCategories = []
  } = _column

  const originalCategories = useRef([]);
  const filteredCategories = useRef([]);
  const loading = useRef(0);

  const mergeCategories = useCallback(() => {
      console.log(loading.current);
      setCategoryData(originalCategories.current);
      if (originalCategories.current && filteredCategories.current) {
        console.log('ENTRO');
      } else {
        setCategoryData(originalCategories.current);
      }
    },
    [],
  );

  useEffect(() => {
    originalCategories.current = []
    filteredCategories.current = [];
    loading.current = 0;

    if (data && credentials) {
      loading.current ++;
      getCategories({ ...props, data, credentials }).then(data => {
        loading.current --;
        originalCategories.current = data;
        mergeCategories();
      })
    } else {
      mergeCategories();
    }
  }, [credentials, data, props, mergeCategories]);

  useEffect(() => {

    if (data && credentials && filters) {
      loading.current ++;
      getCategories({ ...props, data, filters, credentials }).then(data => {
        loading.current --;
        filteredCategories.current = data;
        mergeCategories();
      })
    }
  }, [credentials, data, filters, props, mergeCategories]);


  const handleSelectedCategoriesChange = (categories) => {
    dispatch(addFilter({
      id: props['data-source'],
      column,
      type: FilterTypes.IN,
      values: categories
    }));
  }

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
