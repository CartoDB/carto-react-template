---
inject: true
to: "<%= attach ? `src/components/views/${view}.js` : null %>"
after: "<%= view %>() {"
skip_if: "const dispatch = useDispatch()"
---
  const dispatch = useDispatch();
