---
inject: true
to: "<%= datasource ? `src/app/cartoSlice.js` : null %>"
after: "    layers: {"
---
<% const comp = h.changeCase.camelCase(name) -%>
      <%= comp %>Layer: { id: '<%= comp %>Layer', source: '<%= comp %>Source' },