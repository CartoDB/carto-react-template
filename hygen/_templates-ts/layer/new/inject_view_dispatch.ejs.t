---
inject: true
to: "<%= attach ? `src/${view_path}` : null %>"
after: "export default function"
skip_if: "const dispatch = useDispatch()"
---
  const dispatch = useDispatch();