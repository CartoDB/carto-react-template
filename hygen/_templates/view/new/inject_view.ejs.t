---
inject: true
to: src/routes.js
before: // \[hygen\] Add routes
skip_if: /<%= h.changeCase.camelCase(route) %>
---
      { path: '<%= route %>', element: <<%= h.changeCase.pascalCase(name) %>/> },
