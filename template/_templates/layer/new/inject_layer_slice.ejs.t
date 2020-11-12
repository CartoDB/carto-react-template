---
inject: true
to: src/config/cartoSlice.js
after: "// layers"
skip_if: <%= h.changeCase.pascalCase(name) %>Layer
---
<% const comp = h.changeCase.pascalCase(name) -%>
      <%= comp %>Layer: {
        id: '<%= comp %>Layer',
        source: '<%= source %>'
      },