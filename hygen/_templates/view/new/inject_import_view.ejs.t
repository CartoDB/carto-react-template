---
inject: true
to: src/routes.js
before: // \[hygen\] Import views
skip_if: import <%= h.changeCase.pascalCase(name) %>
---import <%= h.changeCase.pascalCase(name) %> from '<%= view_path %>/<%= h.changeCase.pascalCase(name) %>.js';