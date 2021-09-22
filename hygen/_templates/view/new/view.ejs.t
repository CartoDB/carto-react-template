---
to: src/components/views/<%= h.changeCase.pascalCase(name) %>.js
---
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  <%= h.changeCase.camelCase(name) %>: {},
}));

export default function <%= h.changeCase.pascalCase(name) %>() {
  const classes = useStyles();

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.<%= h.changeCase.camelCase(name) %>}>
      <Grid item>Hello World</Grid>
    </Grid>
  );
}
