import {execute} from '../api/Sql';

export const getCategories = (props) => {
    const { source, column, operation, 'operation-column': operationColumn } = props;
    const query = `
      SELECT ${column} as name, ${operation}(${operationColumn}) as value
      FROM (${source.data}) as q
      GROUP BY ${column}
    `;
    
    return execute(query, source.credentials);
}
