---
to: src/components/common/<%= h.changeCase.pascalCase(name) -%>.js
---
<% if(add_style){ -%>
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  <%= h.changeCase.camelCase(name) %>: {},
}));

<% } -%>
export default function <%= h.changeCase.pascalCase(name) %>() {
  <% if(add_style){ -%>
const classes = useStyles();

  <% } -%>
return <div<% if(add_style){ -%> className={classes.<%= h.changeCase.camelCase(name) %>}<% } -%>><%= h.changeCase.pascalCase(name) %> is working!</div>;
}
