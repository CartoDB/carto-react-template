---
inject: true
to: src/features/map/Map.js
skip_if: "import { <%= h.changeCase.pascalCase(name) %>Layer } from './layers/<%= h.changeCase.pascalCase(name) %>Layer'"
after: "// Layers"
---
<% const comp = h.changeCase.pascalCase(name) -%>
import { <%= comp %>Layer } from './layers/<%= comp %>Layer';