---
inject: true
to: src/routes.js
before: "// Auto import"
skip_if: <%= h.changeCase.pascalCase(name) %>
---
import <%= h.changeCase.pascalCase(name) %> from 'components/views/<%= h.changeCase.pascalCase(name) %>.js';