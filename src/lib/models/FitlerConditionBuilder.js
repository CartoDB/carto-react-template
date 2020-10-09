export const FilterTypes = Object.freeze({
  IN: 'in',
});

export const getFilterCondition = (filters = {}) => {
  const result = [];

  Object.entries(filters).forEach(([column, filter]) => {
    Object.entries(filter).forEach(([operator, values]) => {
      result.push(`${column} ${operator}(${values.map((v) => `'${v}'`).join(',')})`);
    });
  });

  return result.length ? `WHERE ${result.join(' AND ')}` : '';
};

export const getFilteredQuery = ({ data, filters }) => {
  return `
    SELECT *
    FROM (${data}) as q
    ${getFilterCondition(filters)}
  `;
};
