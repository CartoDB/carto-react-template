---
inject: true
to: "<%= attach ? `src/components/views/${view}.js` : null %>"
after: "export default function"
skip_if: "const dispatch = useDispatch()"
---
  const dispatch = useDispatch();