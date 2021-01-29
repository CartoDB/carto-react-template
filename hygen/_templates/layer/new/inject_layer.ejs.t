---
inject: true
to: src/components/layers/index.js
before: // \[hygen\] Add layer
skip_if: <%= h.changeCase.pascalCase(name) %>\(\)
---
    <%= h.changeCase.pascalCase(name) %>(),