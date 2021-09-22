---
inject: true
to: "<%= ts ? `src/routes.tsx` : null %>"
before: // \[hygen\] Add routes
skip_if: ROUTE_PATHS.<%= h.changeCase.constantCase(name) %>
---
      { path: ROUTE_PATHS.<%= h.changeCase.constantCase(name) %>, element: <<%= h.changeCase.pascalCase(name) %> /> },