---
inject: true
to: "<%= attach ? `src/components/views/${view}.js` : null %>"
after: "'react'"
skip_if: "cartoSlice'"
---
import { slice } from 'react-victor-test';
const { addLayer, removeLayer, addSource, removeSource } = slice';