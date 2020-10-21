import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Collapse, Grid, Icon } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    padding: 0,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '56px',
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(2),
  },
  button: {
    padding: 0,
    cursor: (props) => (props.expandable ? 'pointer' : 'default'),
    '& .MuiButton-label': {
      marginLeft: '4px',
      fontFamily: 'OpenSans, sans-serif',
      fontWeight: 600,
      fontSize: '0.875rem',
      lineHeight: 1.71,
      letterSpacing: '0.01071em',
      '& .MuiButton-startIcon': {
        marginLeft: 0,
        marginRight: theme.spacing(0.5),
      },
    },
    '&:hover': {
      background: 'none',
    },
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  content: {
    paddingTop: 0,
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(3),
  },
}));

function WrapperWidgetUI(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(true);

  const icons = ['icon-content-minimize.svg', 'icon-content-maximize.svg'];
  const handleExpandClick = () => {
    if (props.expandable) {
      setExpanded(!expanded);
    }
  };

  return (
    <Box className={classes.root}>
      <Grid container className={classes.header}>
        <Button
          className={classes.button}
          startIcon={
            props.expandable && (
              <Icon className={classes.icon}>
                <img src={expanded ? icons[0] : icons[1]} alt='Icon' />
              </Icon>
            )
          }
          onClick={handleExpandClick}
        >
          {props.title}
        </Button>

        <Grid item>actions here</Grid>
      </Grid>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <Box className={classes.content}>{props.children}</Box>
      </Collapse>
    </Box>
  );
}

WrapperWidgetUI.defaultProps = {
  expandable: true,
};

WrapperWidgetUI.propTypes = {
  title: PropTypes.string.isRequired,
  expandable: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired,
  ]),
};

export default WrapperWidgetUI;
