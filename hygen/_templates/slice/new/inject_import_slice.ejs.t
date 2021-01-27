---
inject: true
to: src/config/store.js
after: "import"
---
import <%= h.changeCase.camelCase(file_name) -%> from './<%= h.changeCase.camelCase(file_name) -%>';