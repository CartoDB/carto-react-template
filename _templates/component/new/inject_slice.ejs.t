---
inject: true
to: "<%= slice ? `src/app/store.js` : null %>"
skip_if: features/<%= name %>
after: "import { configureStore } from '@reduxjs/toolkit';"
---
<% const comp = h.changeCase.camel(name) -%>
import <%= comp %>Reducer from 'features/<%= h.changeCase.paramCase(name) %>/<%= comp %>Slice';