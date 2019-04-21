import React from 'react';
import { withStyles } from '@material-ui/core';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { styled } from '../styling';

const styles = {
  wrapper: {
    // anything?
  },
  wide: {
    width: '100%',
  },
  tall: {
    height: '100%',
  },
  round: {
    borderRadius: '50%',
  },
};

class Image extends React.Component {
  render() {
    const {
      src, alt, round, classes, style, fit = 'cover', onClick, ...rest
    } = this.props;

    const imageClassName = classNames(classes.image, {
      [classes.round]: round,
      [classes.wide]: style.width !== undefined,
      [classes.tall]: style.height !== undefined,
    });

    return (
      <div className={classes.wrapper} style={style} {...rest}>
        <img src={src} alt={alt} className={imageClassName} style={{ objectFit: fit }} />
      </div>
    );
  }
}

Image.propTypes = {
  alt: PropTypes.string,
  classes: PropTypes.any,
  fit: PropTypes.string,
  onClick: PropTypes.any,
  round: PropTypes.bool,
  src: PropTypes.any,
  style: PropTypes.object,
};

Image.defaultProps = {
  alt: '',
  round: false,
  style: {},
};

const StyledImage = withStyles(styles)(Image);

export default styled(StyledImage, 'width', 'height');
