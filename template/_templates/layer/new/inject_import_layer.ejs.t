---
inject: true
to: src/components/layers/index.js
skip_if: "import <%= h.changeCase.pascalCase(name) %>Layer"
before: "// Auto import"
---
<% const comp = h.changeCase.pascalCase(name) -%>
import <%= comp %>Layer from './<%= comp %>Layer';