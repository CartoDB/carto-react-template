---
inject: true
to: src/components/layers/index.js
skip_if: "import <%= h.changeCase.pascalCase(name) %>"
before: // \[hygen\] Import layers
---
<% const comp = h.changeCase.pascalCase(name) -%>
import <%= h.changeCase.pascalCase(name) %> from './<%= comp %>';