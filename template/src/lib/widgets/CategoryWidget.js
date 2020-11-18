import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFilter, removeFilter, selectSourceById } from 'lib/slice/cartoSlice';
import { WrapperWidgetUI, CategoryWidgetUI } from 'lib/ui';
import { FilterTypes, getApplicableFilters } from 'lib/api';
import { setError } from 'config/appSlice';
import { getCategories } from './models';

export default function CategoryWidget(props) {
  const { column } = props;
  const [categoryData, setCategoryData] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const viewport = useSelector((state) => props.viewportFilter && state.carto.viewport);
  const source = useSelector((state) => selectSourceById(state, props.dataSource) || {});
  const { data, credentials } = source;

  useEffect(() => {
    const abortController = new AbortController();
    if (
      data &&
      credentials &&
      (!props.viewportFilter || (props.viewportFilter && viewport))
    ) {
      const filters = getApplicableFilters(source.filters, props.id);
      setLoading(true);
      getCategories({
        ...props,
        data,
        filters,
        credentials,
        viewport,
        opts: { abortController },
      })
        .then((data) => {
          setCategoryData(data);
          setLoading(false);
        })
        .catch((error) => {
          if (error.name === 'AbortError') return;

          dispatch(setError(`Category widget error: ${error.message}`));
        });
    } else {
      setCategoryData(null);
    }

    return function cleanup() {
      abortController.abort();
    };
  }, [credentials, data, source.filters, viewport, props, dispatch]);

  const handleSelectedCategoriesChange = (categories) => {
    setSelectedCategories(categories);
    if (categories && categories.length) {
      dispatch(
        addFilter({
          id: props.dataSource,
          column,
          type: FilterTypes.IN,
          values: categories,
          owner: props.id,
        })
      );
    } else {
      dispatch(
        removeFilter({
          id: props.dataSource,
          column,
        })
      );
    }
  };

  return (
    <WrapperWidgetUI title={props.title} loading={loading}>
      <CategoryWidgetUI
        data={categoryData}
        formatter={props.formatter}
        labels={props.labels}
        loading={loading}
        selectedCategories={selectedCategories}
        onSelectedCategoriesChange={handleSelectedCategoriesChange}
      />
    </WrapperWidgetUI>
  );
}
