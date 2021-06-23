---
inject: true
to: src/routes.js
before: // \[hygen\] Add routes
skip_if: /<%= h.changeCase.camelCase(route) %>
---
      { path: ROUTE_PATHS.<%= h.changeCase.constantCase(name) %>, element: <<%= h.changeCase.pascalCase(name) %> /> },
