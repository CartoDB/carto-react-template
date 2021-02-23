---
to: src/components/common/<%= h.changeCase.pascalCase(name) -%>.js
---
import React from 'react';
<% if(add_style){ -%>
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
}));
<% } -%>

export function <%= h.changeCase.pascalCase(name) %>(props) {
  <% if(add_style){ -%>
const classes = useStyles();
  <% } -%>

  return (
    <div><%= h.changeCase.pascalCase(name) %> is working!</div>
  )
}
