---
inject: true
to: "<%= attach ? `src/${view_path}` : null %>"
after: "from 'react'"
skip_if: "{ useEffect }"
---
import { useEffect } from 'react';