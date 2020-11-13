---
inject: true
to: src/components/layers/index.js
skip_if: "import <%= h.changeCase.pascalCase(name) %>"
before: "// Auto import"
---
<% const comp = h.changeCase.pascalCase(name) -%>
import <%= comp %> from './<%= comp %>';