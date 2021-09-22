---
inject: true
to: "<%= attach ? `src/${view_path}` : null %>"
after: "from 'react'"
skip_if: "import { <%= h.changeCase.constantCase(name) %>_ID"
---
import { <%= h.changeCase.constantCase(name) %>_ID } from 'components/layers/<%= h.changeCase.pascalCase(name) -%>';