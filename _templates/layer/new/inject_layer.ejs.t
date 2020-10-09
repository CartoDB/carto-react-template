---
inject: true
to: src/features/map/Map.js
after: "    // Layer instances"
---
<% const comp = h.changeCase.pascalCase(name) -%>
    <%= comp %>Layer(),