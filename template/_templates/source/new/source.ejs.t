---
inject: true
to: src/config/cartoSlice.js
before: "// Auto import dataSources"
skip_if: "'<%= id -%>':"
---
      '<%= id -%>': {
        id: '<%= id -%>',
        data: '<%- data -%>',
        type: '<%= type %>',
      },