---
inject: true
to: "<%= attach ? `src/components/views/${view}.js` : null %>"
before: return \(
skip_if: "id: '<%= h.changeCase.camelCase(name) -%>'"
---

  useEffect(() => {
    // Attach the layer
    dispatch(
      addLayer({
        id: '<%= h.changeCase.camelCase(name) -%>',
        source: '<%= h.changeCase.camelCase(source) -%>',
      })
    );
    // Cleanup
    return function cleanup() {
      dispatch(removeLayer('<%= h.changeCase.camelCase(name) -%>'));
    };
  }, [dispatch]);
