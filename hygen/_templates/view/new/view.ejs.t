---
to: src/components/views/<%= h.changeCase.pascalCase(name) %>.js
---
import { Grid } from '@mui/material';

export default function <%= h.changeCase.pascalCase(name) %>() {

  // [hygen] Add useEffect

  return (
    <Grid container direction='column'>
      <Grid item>Hello World</Grid>
    </Grid>
  );
}
