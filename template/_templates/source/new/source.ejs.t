---
inject: true
to: src/config/cartoSlice.js
before: "// Auto import dataSources"
skip_if: "'<%= name -%>':"
---
      '<%= name -%>': {
        id: '<%= name -%>',
        data: '<%= data -%>',
      },