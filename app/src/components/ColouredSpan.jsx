import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

class ColouredSpan extends Component {
  render() {
    const {
      colour, children, classes, ...rest
    } = this.props;

    return (
      <span className={classes[colour]} {...rest}>
        {children}
      </span>
    );
  }
}

ColouredSpan.propTypes = {
  children: PropTypes.any,
  classes: PropTypes.any,
  colour: PropTypes.any,
};

const styles = theme => ({
  primary: {
    color: theme.palette.primary.main,
  },
  secondary: {
    color: theme.palette.secondary.main,
  },
});

export default withStyles(styles)(ColouredSpan);
