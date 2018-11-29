// reducers 添加命名空间前缀
import { Dispatch, Action, ReducersMapObject } from 'redux';
import { AppModelObjProps } from '../types/index';

/**
 * 返回一个加了前缀的reducer key
 * @param namespace 命名空间
 * @param reducerKey Model reducer key值
 */
export function reducersPrefix(namespace: string, reducerKey: string) {
  return `${namespace}/${reducerKey}`;
}

/**
 * 为Model中的reducers 添加命名空间前缀
 * @param namespace 命名空间
 * @param reducers Model reducers
 */
export function addPrefixInReducers(namespace: string, reducers: ReducersMapObject) {
  const newReducers: ReducersMapObject = {};
  Object.keys(reducers).forEach((reducerKey) => {
    const newReducerKey = reducersPrefix(namespace, reducerKey);
    newReducers[newReducerKey] = reducers[reducerKey];
  });
  return newReducers;
}

/**
 * dispatch时添加为action.type自动添加前缀
 * @param dispatch redux dispatch
 * @param model Model对线
 */
export function dispatchPrefix(dispatch: Dispatch, model: AppModelObjProps) {
  return (action: Action) => {
    return dispatch({ ...action, type: reducersPrefix(model.namespace, action.type) });
  };
}
