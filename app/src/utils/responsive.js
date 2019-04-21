const widthMap = {
  xs: 0,
  sm: 1,
  md: 2,
  lg: 3,
};


export const enumerateSize = size => widthMap[size];

export const isMobile = size => enumerateSize(size) <= enumerateSize('sm');

export const propagateUp = (xs, sm, md, lg) => {
  const obj = {
    xs, sm, md, lg,
  };

  const keys = Object.keys(obj);
  keys.forEach((key, index) => {
    if (obj[key] === undefined) {
      const prevKey = keys[index - 1];
      obj[key] = obj[prevKey];
    }
  });

  return obj;
};
