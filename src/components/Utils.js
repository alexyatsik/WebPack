'use strict';

export const kebabToCamelCase = (string) => {
  return string.replace(/-./g, x => x[1].toUpperCase());
};