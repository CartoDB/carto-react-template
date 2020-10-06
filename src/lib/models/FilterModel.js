export const getFilters = (filters) => {
  const result = [];

  Object.entries(filters).forEach(([column, filter]) => {
    Object.entries(filter).forEach(([operator, values]) => {
      result.push(`${column} ${operator}(${values.map(v => `'${v}'`).join(',')})`)
    })
  })

  return result.join(' AND ');
}
