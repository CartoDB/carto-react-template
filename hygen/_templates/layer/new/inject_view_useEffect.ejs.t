---
inject: true
to: "<%= attach ? `src/${view_path}` : null %>"
before: "// Auto import useEffect"
skip_if: "addSource(<%= h.changeCase.camelCase(source_file) %>)"
---

  const LAYER_ID = `<%= h.changeCase.camelCase(name) -%>Layer`;

  useEffect(() => {

    // Add the source
    dispatch(
      addSource(<%= h.changeCase.camelCase(source_file) %>)
    );

    // Add the layer
    dispatch(
      addLayer({
        id: LAYER_ID,
        source: <%= h.changeCase.camelCase(source_file) %>.id,
      })
    );

    // Cleanup
    return function cleanup() {
      dispatch(removeLayer(LAYER_ID));
      dispatch(removeSource(<%= h.changeCase.camelCase(source_file) %>.id));
    };
  }, [dispatch, LAYER_ID]);
