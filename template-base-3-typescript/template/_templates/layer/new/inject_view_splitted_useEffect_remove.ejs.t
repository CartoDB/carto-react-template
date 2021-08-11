---
inject: true
to: "<%= attach ? `src/${view_path}` : null %>"
before: dispatch\(removeSource\(<%= h.changeCase.camelCase(source_file) %>.id\)\);
skip_if: dispatch\(removeLayer\(<%= h.changeCase.constantCase(name) %>_ID\)\);
---

      dispatch(removeLayer(<%= h.changeCase.constantCase(name) %>_ID));