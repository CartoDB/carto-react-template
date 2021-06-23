---
inject: true
to: src/routes.js
before: // \[hygen\] Add path routes
skip_if: /<%= h.changeCase.constantCase(route) %>
---
      ROUTE_PATHS.<%= h.changeCase.constantCase(name) %>: '<%= route %>',
