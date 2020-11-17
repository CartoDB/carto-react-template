import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFilter, removeFilter, selectSourceById } from 'lib/sdk/slice/cartoSlice';
import { FilterTypes, getCategories } from 'lib/sdk/models';
import { WrapperWidgetUI, CategoryWidgetUI } from 'lib/ui';
import { getApplicableFilters } from '../models/FilterQueryBuilder';

export default function CategoryWidget(props) {
  const { column } = props;
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const viewport = useSelector((state) => props.viewportFilter && state.carto.viewport);
  const source = useSelector((state) => selectSourceById(state, props.dataSource) || {});
  const { data, credentials } = source;

  useEffect(() => {
    if (
      data &&
      credentials &&
      (!props.viewportFilter || (props.viewportFilter && viewport))
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
        selectedCategories={selectedCategories}
        onSelectedCategoriesChange={handleSelectedCategoriesChange}
      />
    </WrapperWidgetUI>
  );
}
