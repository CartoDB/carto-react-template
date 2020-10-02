export const categoryQueryGlobal = (state, props) => {
    const { dataSource, column, operationColumn, operation } = props;
    const source = state.map.dataSources[dataSource];

    if (source) {
      const query = `
        SELECT ${column} as name, ${operation}(${operationColumn}) as value
        FROM (${source.data}) as q
        GROUP BY ${column}
      `;

      return `${source.credentials.serverUrlTemplate.replace('{user}', source.credentials.username)}/api/v2/sql?q=${query}`
    }
    return null;
}
