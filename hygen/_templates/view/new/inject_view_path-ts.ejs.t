---
inject: true
to: "<%= ts ? `src/routes.tsx` : null %>"
before: // \[hygen\] Add path routes
skip_if: <%= h.changeCase.constantCase(route) %>
---
  <%= h.changeCase.constantCase(name) %>: '<%= route %>',