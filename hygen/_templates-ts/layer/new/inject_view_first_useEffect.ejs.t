---
inject: true
to: "<%= attach ? `src/${view_path}` : null %>"
before: // \[hygen\] Add useEffect
skip_if: addSource\(<%= h.changeCase.camelCase(source_file) %>\)
---

  useEffect(() => {
    dispatch(addSource(<%= h.changeCase.camelCase(source_file) %>));

    dispatch(
      addLayer({
        id: <%= h.changeCase.constantCase(name) %>_ID,
        source: <%= h.changeCase.camelCase(source_file) %>.id,
      }),
    );

    return () => {
      dispatch(removeLayer(<%= h.changeCase.constantCase(name) %>_ID));
      dispatch(removeSource(<%= h.changeCase.camelCase(source_file) %>.id));
    };
  }, [dispatch]);
