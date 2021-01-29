---
inject: true
to: "<%= attach ? `src/${view_path}` : null %>"
after: "'react'"
skip_if: "addLayer"
---
import { addLayer, removeLayer, addSource, removeSource } from '@carto/react/redux';
