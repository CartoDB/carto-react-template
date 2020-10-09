---
inject: true
to: "<%= slice ? `src/app/store.js` : null %>"
skip_if: "<%= h.changeCase.camelCase(name) %>: <%= h.changeCase.camel(name) %>Reducer"
after: "reducer: {"
---
<% const comp = h.changeCase.camelCase(name) -%>
    <%= comp %>: <%= comp %>Reducer,