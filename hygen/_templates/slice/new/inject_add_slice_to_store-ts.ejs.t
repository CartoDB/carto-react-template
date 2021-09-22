---
inject: true
to: "<%= ts ? `src/store/store.ts` : null %>"
after: "const staticReducers = {"
---
  <%= h.changeCase.camelCase(name) -%>: <%= h.changeCase.camelCase(file_name) -%>,