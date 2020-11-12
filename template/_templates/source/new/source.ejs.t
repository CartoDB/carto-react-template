---
inject: true
to: src/config/cartoSlice.js
after: "// Auto import dataSources"
skip_if: "'<%= name -%>':"
---
      '<%= name -%>': {
        id: '<%= name -%>',
        data: '<%= data -%>',
      },