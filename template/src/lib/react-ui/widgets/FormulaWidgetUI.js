import React from 'react';
import { Box } from '@material-ui/core';

function FormulaWidgetUI(props) {
  const { data, formatter = (v) => v } = props;
  const value = formatter(data);
  return (
    <Box fontFamily='h4.fontFamily' fontWeight='fontWeightLight' fontSize='h4.fontSize'>
      {value.length ? (
        <span>
          <span>{value[0]}</span>
          {value[1]}
        </span>
      ) : (
        { value }
      )}
    </Box>
  );
}

export default FormulaWidgetUI;
