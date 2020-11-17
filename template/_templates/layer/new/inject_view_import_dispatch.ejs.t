---
inject: true
to: "<%= attach ? `src/components/views/${view}.js` : null %>"
after: "from 'react'"
skip_if: "{ useDispatch }"
---
import { useDispatch } from 'react-redux';