---
inject: true
to: src/lib/slice/cartoSlice.js
before: "// Auto import dataSources"
skip_if: "'<%= id -%>':"
---
      '<%= id -%>': {
        id: '<%= id -%>',
        data: `<%- data -%>`,
        type: '<%= type %>',
      },
