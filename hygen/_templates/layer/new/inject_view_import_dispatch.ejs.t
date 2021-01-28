---
inject: true
to: "<%= attach ? `src/${view_path}` : null %>"
after: "from 'react'"
skip_if: "{ useDispatch }"
---
import { useDispatch } from 'react-redux';