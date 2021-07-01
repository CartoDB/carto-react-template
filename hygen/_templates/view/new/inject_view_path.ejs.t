---
inject: true
to: src/routes.js
before: // \[hygen\] Add path routes
skip_if: <%= h.changeCase.constantCase(route) %>
---
  <%= h.changeCase.constantCase(name) %>: '<%= route %>',