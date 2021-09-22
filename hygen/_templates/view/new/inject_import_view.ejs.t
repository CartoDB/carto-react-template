---
inject: true
to: "<%= !ts ? `src/routes.js` : null %>"
before: // \[hygen\] Import views
skip_if: const <%= h.changeCase.pascalCase(name) %>
---
const <%= h.changeCase.pascalCase(name) %> = lazy(() => import('components/views/<%= h.changeCase.pascalCase(name) %>.js'));