import React from 'react';
import { withTheme } from '@material-ui/core/styles';

export const orientationMap = {
  top: 0,
  right: 1,
  bottom: 2,
  left: 3,
};

/**
 * Maps unitless numbers to values expressed in terms of the theme's default spacing.
 * @param {*} value the unitless number
 * @param {*} theme the current theme
 * @param {*} suffix the suffix to be appended to the result
 */
export const units = (value, theme, suffix = 'px') => parseFloat(value) * theme.spacing.unit + suffix;

export const generateSpacing = (amount = 1, theme, ...orientations) => {
  const spacing = [0, 0, 0, 0];
  orientations.forEach((key) => {
    const index = orientationMap[key];
    spacing[index] = units(amount, theme);
  });

  return spacing.join(' ');
};

/**
 * Transforms a string containing raw values to one with "unitful" numbers.
 * @param {*} inputValue the string to be transformed
 * @param {*} theme the current theme
 */
export const processSpacing = (inputValue, theme) => {
  if (typeof inputValue !== 'string') {
    return inputValue;
  }
  if (inputValue.length === 0) {
    return 0;
  }

  return inputValue
    .split(' ')
    .map(x => units(x, theme))
    .join(' ');
};

// Merges the style passed with the processed properties as well as any additional CSS styles
export const processStyle = ({
  margin = '', padding = '', style = {}, theme, ...rest
}) => ({
  ...style,
  margin: processSpacing(margin, theme),
  padding: processSpacing(padding, theme),
  ...rest,
});

/**
 * Splits the object in two, returning an array where the first item contains an object with
 * only the keys specified in items and the second contains the remaining key-value pairs,
 * @param {*} items the keys to be extracted
 * @param {*} object the subject of the operation
 */
const extract = (items, object) => {
  const extracted = {};
  const rest = { ...object };

  items.forEach((key) => {
    extracted[key] = object[key];
    delete rest[key];
  });

  return [extracted, rest];
};

// =================================================================== //

const validProps = ['margin', 'padding', 'style', 'theme'];

/**
 * This function allows one to more easily apply CSS styles to components, transforming
 * React props into CSS properties. By default, a small set of properties, such as margin
 * and padding, will be pre-processed and inserted into the component's style prop. If you
 * want to convert more props, pass them as strings after the component when calling the function.
 * @param {*} Component the component to be styled
 * @param  {...string} additionalProps other props to be transformed into styles
 */
export const styled = (Component, ...additionalProps) => withTheme()(({ children, ...rest }) => {
  const [params, restOfRest] = extract([...validProps, ...additionalProps], rest);

  return (
    <Component style={processStyle(params)} {...restOfRest}>
      {children}
    </Component>
  );
});
