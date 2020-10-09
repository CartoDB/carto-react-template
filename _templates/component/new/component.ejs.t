---
to: src/features/<%= name %>/<%= h.changeCase.pascalCase(name) %>.js
---
<% const comp = h.changeCase.pascalCase(name) -%>
<% const compParam = h.changeCase.paramCase(name) -%>
<% const compSlice = h.changeCase.camelCase(name) -%>
import React from 'react';
import classnames from 'classnames';
import styles from './<%= comp %>.module.css';
<% if(slice){ -%>
import { useSelector, useDispatch } from 'react-redux';
import {
  setData,
  selectData,
} from './<%= compSlice %>Slice';
<% } -%>

export function <%= comp %> (props) {
  <% if(slice){ %>
  const count = useSelector(selectData);
  const dispatch = useDispatch();
  <% } %>
  return (
    <div className={classnames(styles.<%= h.changeCase.camelCase(name) %>)}>
      edit me: at components/<%= compParam %>/<%= comp %>.js
    </div>
  )
}
