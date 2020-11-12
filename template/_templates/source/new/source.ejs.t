---
inject: true
to: src/config/cartoSlice.js
after: "// dataSources"
skip_if: "'<%= name -%>':"
---
      '<%= name -%>': {
        id: '<%= name -%>',
        data: '<%= data -%>',
      },