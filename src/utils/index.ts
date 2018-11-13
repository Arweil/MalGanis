export function checkType(params: any): boolean {
  return Object.prototype.toString.call(params);
}

export function isObject(obj: object): boolean {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
