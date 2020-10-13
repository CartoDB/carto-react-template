import {execute} from '../api/Sql';
import {getFilterCondition} from './FitlerConditionBuilder'

export const getCategories = (props) => {
    const { data, credentials, column, operation, 'operation-column': operationColumn, filters } = props;

    if (Array.isArray(data)) {
      throw new Error('Array is not a valid type to get categories');
    }

    const query = `WITH all_categories as (
      SELECT ${column} as category
        FROM (${data}) as q
      GROUP BY category
    ),
    categories as (
      SELECT ${column} as category, ${operation}(${operationColumn}) as value
        FROM (${data}) as q
      ${getFilterCondition(filters)}
      GROUP BY category
      ORDER BY value DESC
    )
    SELECT a.category, b.value
     FROM all_categories a
     LEFT JOIN categories b ON a.category=b.category;`

    return execute(query, credentials);
}
