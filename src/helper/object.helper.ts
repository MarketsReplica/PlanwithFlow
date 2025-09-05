export const cloneObject = (obj: object | []) =>
  JSON.parse(JSON.stringify(obj));

export const isEqual = (obj1: object, obj2: object) =>
  JSON.stringify(obj1) === JSON.stringify(obj2);
