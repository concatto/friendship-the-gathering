import React from 'react';
import { FormControlLabel, Radio } from '@material-ui/core';
import Box from './Box';

const Option = ({ ...rest }) => (
  <Box margin="0.5 0">
    <FormControlLabel control={<Radio style={{ padding: '12px 12px' }} />} {...rest} />
  </Box>
);

// const Option = ({ ...rest }) => (
//   <FormControlLabel control={<Radio />} {...rest} />
// );

export default Option;
