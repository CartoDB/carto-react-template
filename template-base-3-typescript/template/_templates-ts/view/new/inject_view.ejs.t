---
inject: true
to: src/routes.tsx
before: // \[hygen\] Add routes
skip_if: ROUTE_PATHS.<%= h.changeCase.constantCase(name) %>
---
      { path: ROUTE_PATHS.<%= h.changeCase.constantCase(name) %>, element: <<%= h.changeCase.pascalCase(name) %> /> },