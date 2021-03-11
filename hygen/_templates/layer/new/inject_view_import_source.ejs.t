---
inject: true
to: "<%= attach ? `src/${view_path}` : null %>"
after: "from 'react'"
skip_if: "<%= `data/sources/${source_file}` %>"
---
import <%= h.changeCase.camelCase(source_file) %> from 'data/sources/<%= h.changeCase.camelCase(source_file) %>';