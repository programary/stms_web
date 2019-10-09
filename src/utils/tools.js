export const jsonReplacer = (key, value) =>
  value === '' || value === undefined || value === null ? undefined : value;
