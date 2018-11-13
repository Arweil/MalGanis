// 用来处理 model 中的reducers 对象
// 把reducers对象和并成为一个reducer

import { isObject } from '../utils/index';
import { Action, Reducer, ReducersMapObject } from 'redux';

export default function finReducer(reducerObj: ReducersMapObject, initialState: any): Reducer {
  if (!isObject(reducerObj)) {
    return (state: any, action: Action) => state;
  }

  const reducerList = Object.keys(reducerObj).map((key) => {
    return (state: any, action: Action) => {
      const { type } = action;
      if (key === type) {
        return reducerObj[key](state, action);
      }
      return state;
    };
  });

  return (state = initialState, action: Action) => {
    return reducerList.reduce(
      (accumulator, curReducer) => {
        // 上一个state作为入参
        return curReducer(accumulator, action);
      },
      state);
  };
}
