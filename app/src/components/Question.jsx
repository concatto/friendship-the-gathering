import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Box from './Box';

class Question extends Component {
  render() {
    const {
      description, typography = 'h5', children, ...rest
    } = this.props;

    return (
      <Box padding="0 0 6 0" {...rest}>
        <Box padding="0 0 2 0">
          <Typography variant={typography}>
            {description}
          </Typography>
        </Box>
        {children}
      </Box>
    );
  }
}

Question.propTypes = {
  children: PropTypes.any,
  description: PropTypes.any,
  typography: PropTypes.string,
};

export default Question;
