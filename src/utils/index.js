export function checkType(params) {
  return Object.prototype.toString.call(params);
}

export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

