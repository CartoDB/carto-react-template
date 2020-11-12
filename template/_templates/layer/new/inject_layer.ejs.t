---
inject: true
to: src/components/layers/index.js
after: "// layer"
skip_if: <%= h.changeCase.pascalCase(name) %>Layer()
---
<% const comp = h.changeCase.pascalCase(name) -%>
    <%= comp %>Layer(),