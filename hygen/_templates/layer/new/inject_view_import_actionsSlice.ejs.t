---
inject: true
to: "<%= attach ? `src/${view_path}` : null %>"
after: "'react'"
skip_if: "cartoSlice'"
---
import { addLayer, removeLayer, addSource, removeSource } from '@carto/react/redux';