---
inject: true
to: src/config/store.js
after: "const staticReducers = {"
---
  <%= h.changeCase.camelCase(name) -%>: <%= h.changeCase.camelCase(file_name) -%>,