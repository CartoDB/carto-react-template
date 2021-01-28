---
inject: true
to: src/components/layers/index.js
before: "// Auto import layers"
skip_if: <%= h.changeCase.pascalCase(name) %>\(\)
---
    <%= h.changeCase.pascalCase(name) %>(),