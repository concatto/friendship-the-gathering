import React from 'react';
import { CircularProgress, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import Box from './Box';

class RequestButton extends React.Component {
  render() {
    const {
      padding, busy, disabled, children, ...rest
    } = this.props;

    return (
      <Box crossAlign="center" padding={padding}>
        <Box position="relative">

          <Button
            disabled={busy || disabled}
            {...rest}
          >
            {children}
          </Button>

          {busy && (
            <CircularProgress style={{ position: 'absolute', right: -60 }} />
          )}
        </Box>
      </Box>
    );
  }
}

RequestButton.propTypes = {
  busy: PropTypes.any,
  children: PropTypes.any,
  disabled: PropTypes.any,
  padding: PropTypes.any,
};

export default RequestButton;
