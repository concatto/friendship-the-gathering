import lodash from 'lodash';

export const traverse = (item, leafMapper) => {
  if (lodash.isObjectLike(item) === false) {
    return leafMapper(item);
  }

  return lodash.mapValues(item, value => traverse(value, leafMapper));
};

export const removeImmutably = (arr, i) => [...arr.slice(0, i), ...arr.slice(i + 1)];
