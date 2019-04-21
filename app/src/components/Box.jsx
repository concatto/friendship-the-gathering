/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '../styling';

const flexMap = {
  grow: '1 0',
  shrink: '0 1',
};

const Box = ({
  component: Component, children, direction, mainAlign, crossAlign, flex, style, onClick, ...rest
}) => (
  <Component
    onClick={onClick}
    style={{
      ...style,
      cursor: onClick === undefined ? undefined : 'pointer',
      display: 'flex',
      flexDirection: direction,
      justifyContent: mainAlign,
      alignItems: crossAlign,
      flex: flex in flexMap ? flexMap[flex] : flex,
    }}
    {...rest}
  >
    {children}
  </Component>
);

Box.propTypes = {
  children: PropTypes.node,
  crossAlign: PropTypes.string, // vertical for row, horizontal for column
  direction: PropTypes.string,
  flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mainAlign: PropTypes.string, // vertical for column, horizontal for row
  style: PropTypes.object,
  onClick: PropTypes.func,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

Box.defaultProps = {
  direction: 'column',
  style: {},
  component: 'div',
};

export default styled(Box, 'position', 'width', 'height', 'maxWidth', 'maxHeight');
