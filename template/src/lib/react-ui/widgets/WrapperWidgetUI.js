import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Collapse,
  Grid,
  Icon,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
    paddingRight: theme.spacing(2),
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

const ICONS = ['icon-content-minimize.svg', 'icon-content-maximize.svg'];

function WrapperWidgetUI(props) {
  const wrapper = createRef();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleExpandClick = () => {
    if (props.expandable) {
      setExpanded(!expanded);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionAction = (action) => {
    if (action) {
      action();
    }

    handleClose();
  };

  return (
    <Box className={classes.root}>
      <Grid container className={classes.header}>
        <Button
          className={classes.button}
          startIcon={
            props.expandable && (
              <Icon className={classes.icon}>
                <img src={expanded ? ICONS[0] : ICONS[1]} alt='Icon' />
              </Icon>
            )
          }
          onClick={handleExpandClick}
        >
          {props.title}
        </Button>

        <Grid item>
          {props.actions.map((action) => {
            return (
              <IconButton
                key={action.id}
                aria-label={action.label}
                onClick={action.action}
              >
                <img src={action.icon} alt={action.name} />
              </IconButton>
            );
          })}

          {
            <IconButton
              aria-label='options'
              aria-controls='long-menu'
              aria-haspopup='true'
              onClick={handleClick}
            >
              <MoreVertIcon color='primary' />
            </IconButton>
          }
          <Menu
            id='options-menu'
            elevation={3}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                marginTop: '48px',
                maxHeight: '144px',
                width: '128px',
              },
            }}
          >
            {props.options.map((option) => (
              <MenuItem
                key={option.id}
                selected={option.selected}
                onClick={() => handleOptionAction(option.action)}
              >
                {option.name}
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      </Grid>
      {/* TODO: check collapse error */}
      <Collapse ref={wrapper} in={expanded} timeout='auto' unmountOnExit>
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
  actions: PropTypes.array, // TODO: validate array items format
  options: PropTypes.array, // TODO: validate array items format
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired,
  ]),
};

export default WrapperWidgetUI;
