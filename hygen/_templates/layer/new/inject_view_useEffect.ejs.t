---
inject: true
to: "<%= attach ? `src/components/views/${view}.js` : null %>"
before: return \(
skip_if: "id: '<%= h.changeCase.camelCase(name) -%>'"
---

  useEffect(() => {

    const SOURCE_ID = `<%= h.changeCase.camelCase(name) + 'Source' -%>`
    const LAYER_ID = `<%= h.changeCase.camelCase(name) -%>`

    // Add the source
    dispatch(
      addSource({
        id: SOURCE_ID,
        data: `<%- data -%>`,
        type: '<%= type_source %>',
      })
    );

    // Add the layer
    dispatch(
      addLayer({
        id: LAYER_ID,
        source: SOURCE_ID,
      })
    );
    
    // Cleanup
    return function cleanup() {
      dispatch(removeLayer(LAYER_ID));
      dispatch(removeSource(SOURCE_ID));
    };
  }, [dispatch]);
