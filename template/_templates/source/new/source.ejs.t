---
inject: true
to: src/lib/sdk/slice/cartoSlice.js
before: "// Auto import dataSources"
skip_if: "'<%= id -%>':"
---
      '<%= id -%>': {
        id: '<%= id -%>',
        data: `<%- data -%>`,
        type: '<%= type %>',
      },
