import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import Box from './Box';

class Finished extends Component {
  render() {
    return (
      <Box padding="4 0">
        <Typography variant="h4" align="center">
          Você completou o questionário! Muito obrigado!
        </Typography>
      </Box>
    );
  }
}

export default Finished;
