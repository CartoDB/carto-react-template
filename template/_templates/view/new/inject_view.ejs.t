---
inject: true
to: src/routes.js
before: "// Auto import routes"
skip_if: /<%= h.changeCase.camelCase(route) %>
---
      { path: '<%= route %>', element: <<%= h.changeCase.pascalCase(name) %>/> },
