import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';

function WrapperWidgetUI(props) {
  return (
    <Box padding={3}>
      <Typography variant='subtitle2'>{props.title}</Typography>
      {props.children}
    </Box>
  );
}

WrapperWidgetUI.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired,
  ]),
};

export default WrapperWidgetUI;
