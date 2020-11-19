---
inject: true
to: "<%= attach ? `src/components/views/${view}.js` : null %>"
after: "from 'react'"
skip_if: "{ useEffect }"
---
import { useEffect } from 'react';