---
inject: true
to: src/components/layers/index.ts
before: // \[hygen\] Add layer
skip_if: <%= h.changeCase.pascalCase(name) %>\(\)
---
    <%= h.changeCase.pascalCase(name) %>(),