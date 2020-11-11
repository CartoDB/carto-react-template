import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSourceById, addFilter, removeFilter } from 'config/cartoSlice';
import { FilterTypes, getCategories } from 'lib/sdk';
import { WrapperWidgetUI, CategoryWidgetUI } from '@carto/react-airship-ui';
import { getApplicableFilters } from '../models/FilterQueryBuilder';

function getSelectCategories(column, filters) {
  return filters && filters[column] && filters[column][FilterTypes.IN]
    ? filters[column][FilterTypes.IN].values
    : [];
}

export default function CategoryWidget(props) {
  const { column } = props;
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const viewport = useSelector(
    (state) => props['viewport-filter'] && state.carto.viewport
  );
  const source = useSelector(
    (state) => selectSourceById(state, props['data-source']) || {}
  );
  const { data, credentials } = source;
  const selectedCategories = getSelectCategories(column, source.filters);

  useEffect(() => {
    if (
      data &&
      credentials &&
      (!props['viewport-filter'] || (props['viewport-filter'] && viewport))
    ) {
      const filters = getApplicableFilters(source.filters, props.id);
      setLoading(true);
      getCategories({ ...props, data, filters, credentials, viewport }).then((data) => {
        setCategoryData(data);
        setLoading(false);
      });
    } else {
      setCategoryData([]);
    }
  }, [credentials, data, source.filters, viewport, props]);

  const handleSelectedCategoriesChange = (categories) => {
    if (categories && categories.length) {
      dispatch(
        addFilter({
          id: props['data-source'],
          column,
          type: FilterTypes.IN,
          values: categories,
          owner: props.id,
        })
      );
    } else {
      dispatch(
        removeFilter({
          id: props['data-source'],
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
        selectedCategories={selectedCategories}
        onSelectedCategoriesChange={handleSelectedCategoriesChange}
      />
    </WrapperWidgetUI>
  );
}
