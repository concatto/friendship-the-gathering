import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const Paragraph = ({ children, compact, ...rest }) => (
  <Typography style={{ fontSize: 18, marginBottom: compact ? 6 : 22, fontWeight: 300 }} {...rest}>
    {children}
  </Typography>
);

Paragraph.propTypes = {
  children: PropTypes.any,
};

export default Paragraph;
