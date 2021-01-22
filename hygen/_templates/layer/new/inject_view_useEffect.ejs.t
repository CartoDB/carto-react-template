---
inject: true
to: "<%= attach ? `src/${view_path}` : null %>"
before: "// Auto import useEffect"
skip_if: "addSource(<%= h.changeCase.camelCase(source_file) %>)"
---

  useEffect(() => {
    // Add the source
    dispatch(
      addSource(<%= h.changeCase.camelCase(source_file) %>)
    );

    // Add the layer
    dispatch(
      addLayer({
        id: <%= h.changeCase.constantCase(name) %>_ID,
        source: <%= h.changeCase.camelCase(source_file) %>.id,
      })
    );

    // Cleanup
    return function cleanup() {
      dispatch(removeLayer(<%= h.changeCase.constantCase(name) %>_ID));
      dispatch(removeSource(<%= h.changeCase.camelCase(source_file) %>.id));
    };
  }, [dispatch]);
