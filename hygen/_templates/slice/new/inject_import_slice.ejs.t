---
inject: true
to: src/store/store.js
after: "import"
---
import <%= h.changeCase.camelCase(file_name) -%> from './<%= h.changeCase.camelCase(file_name) -%>';