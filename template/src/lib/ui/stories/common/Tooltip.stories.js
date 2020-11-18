import React from 'react';
import {
  Button,
  Grid,
  Tooltip,
  Typography,
  makeStyles,
  withStyles,
} from '@material-ui/core';

export default {
  title: 'Common/Tooltip',
  component: Tooltip,
  argTypes: {
    title: {
      defaultValue: 'Hello World!',
      control: {
        type: 'text',
      },
    },
    placement: {
      control: {
        type: 'select',
        options: [
          'top-start',
          'top',
          'top-end',
          'left-start',
          'left',
          'left-end',
          'right-start',
          'right',
          'right-end',
          'bottom-start',
          'bottom',
          'bottom-end',
        ],
      },
    },
    arrow: {
      control: {
        type: 'boolean',
      },
    },
    interactive: {
      control: {
        type: 'boolean',
      },
    },
  },
};

const Template = ({ ...args }) => {
  return (
    <Tooltip {...args}>
      <Button>Sample</Button>
    </Tooltip>
  );
};

const TooltipTemplate = () => {
  return (
    <Grid container spacing={2}>
      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <Tooltip title='Tooltip on top' placement='top'>
            <Button>Sample</Button>
          </Tooltip>
        </Grid>
        <Grid item xs={4}>
          <Tooltip title='bottom with arrow' arrow placement='bottom'>
            <Button>Sample</Button>
          </Tooltip>
        </Grid>
        <Grid item xs={4}>
          <Tooltip
            title='Very very very very very very very very very very very very very very long text'
            placement='bottom'
          >
            <Button>Sample</Button>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    paddingTop: theme.spacing(1),
  },
  list: {
    listStyle: 'none',
    paddingLeft: 0,
    margin: theme.spacing(0.5, 0, 0, 0),
    fontWeight: theme.typography.fontWeightRegular,
  },
  item: {
    display: 'inline-block',
    width: theme.spacing(1),
    height: theme.spacing(1),
    borderRadius: '50%',
    marginRight: theme.spacing(0.5),
    backgroundColor: theme.palette.primary.main,
    '&:not(:last-child())': {
      marginBottom: theme.spacing(0.5),
    },
  },
}));

const DataComponent = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography color='inherit' variant='caption' className={classes.title}>
        Category
      </Typography>
      <ul className={classes.list}>
        <li>
          <span className={classes.item}></span>123,000
        </li>
        <li>
          <span className={classes.item}></span>123,000
        </li>
      </ul>
    </React.Fragment>
  );
};

const TooltipDataTemplate = () => {
  const DataTooltip = withStyles((theme) => ({
    tooltip: {
      padding: theme.spacing(1, 1.5),
    },
  }))(Tooltip);
  return (
    <Grid container spacing={2}>
      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <DataTooltip placement='top' title={<DataComponent />}>
            <Button>Sample</Button>
          </DataTooltip>
        </Grid>
      </Grid>
    </Grid>
  );
};

export const Playground = Template.bind({});
Playground.args = {};

export const Text = TooltipTemplate.bind({});
export const Data = TooltipDataTemplate.bind({});
