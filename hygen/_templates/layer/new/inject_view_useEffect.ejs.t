---
inject: true
to: "<%= attach ? `src/${view_path}` : null %>"
before: "// Auto import useEffect"
skip_if: addSource\(<%= h.changeCase.camelCase(source_file) %>\)
---

  useEffect(() => {
    dispatch(
      addSource(<%= h.changeCase.camelCase(source_file) %>)
    );

    dispatch(
      addLayer({
        id: <%= h.changeCase.constantCase(name) %>_ID,
        source: <%= h.changeCase.camelCase(source_file) %>.id,
      })
    );

    return function cleanup() {
      dispatch(removeLayer(<%= h.changeCase.constantCase(name) %>_ID));
      dispatch(removeSource(<%= h.changeCase.camelCase(source_file) %>.id));
    };
  }, [dispatch]);
