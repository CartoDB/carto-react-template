---
inject: true
to: "<%= attach ? `src/${view_path}` : null %>"
after: addSource\(<%= h.changeCase.camelCase(source_file) %>\)\n[ \t]*\)|addSource\(<%= h.changeCase.camelCase(source_file) %>\)\);
skip_if: <%= h.changeCase.constantCase(name) %>_ID,
---

    dispatch(
      addLayer({
        id: <%= h.changeCase.constantCase(name) %>_ID,
        source: <%= h.changeCase.camelCase(source_file) %>.id,
      }),
    );