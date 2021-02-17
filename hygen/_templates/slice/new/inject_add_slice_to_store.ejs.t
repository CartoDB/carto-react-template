---
inject: true
to: src/store/store.js
after: "const staticReducers = {"
---
  <%= h.changeCase.camelCase(name) -%>: <%= h.changeCase.camelCase(file_name) -%>,