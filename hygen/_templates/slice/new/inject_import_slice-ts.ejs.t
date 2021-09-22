---
inject: true
to: "<%= ts ? `src/store/store.ts` : null %>"
after: "import"
---
import <%= h.changeCase.camelCase(file_name) -%> from './<%= h.changeCase.camelCase(file_name) -%>';