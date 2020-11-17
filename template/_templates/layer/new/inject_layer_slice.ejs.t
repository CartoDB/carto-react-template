---
inject: true
to: src/lib/sdk/slice/cartoSlice.js
before: "// Auto import layers"
skip_if: <%= h.changeCase.pascalCase(name) %>
---
<% const comp = h.changeCase.pascalCase(name) -%>
      <%= comp %>: {
        id: '<%= comp %>',
        source: '<%= source %>'
      },