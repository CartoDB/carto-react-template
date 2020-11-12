---
to: src/components/views/<%= h.changeCase.pascalCase(name) %>.js
---
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

}));

export default function <%= h.changeCase.pascalCase(name) %>() {
  const classes = useStyles();

  return (
    <Grid container direction='row'>
      <Grid item>
        Hello World
      </Grid>
    </Grid>
  );
};
