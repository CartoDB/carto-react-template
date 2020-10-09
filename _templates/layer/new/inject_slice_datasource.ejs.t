---
inject: true
to: "<%= datasource ? `src/features/map/mapSlice.js` : null %>"
after: "    dataSources: {"
---
<% const comp = h.changeCase.camelCase(name) -%>
<% const compSnake = h.changeCase.snakeCase(name) -%>
      <%= comp %>Source: {
        id: '<%= comp %>Source',
        data: 'SELECT * FROM <%= compSnake %>',
        credentials: defaultDataSourceCredentials
      },