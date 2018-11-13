// 用来处理 model 中的reducers 对象
// 把reducers对象和并成为一个reducer

import { isObject } from '../utils/index';
import { Action } from 'redux';
import { PropsStrFun } from '../types/index';

export default function finReducer(reducerObj: PropsStrFun, initialState: object) {
  if (!isObject(reducerObj)) {
    return (state: object, action: Action) => state;
  }

  const reducerList = Object.keys(reducerObj).map((key) => {
    return (state: object, action: Action) => {
      const { type } = action;
      if (key === type) {
        return reducerObj[key](state, action)
      }
      return state
    }
  })

  return (state = initialState, action: Action) => {
    return reducerList.reduce((accumulator, curReducer) => {
      // 上一个state作为入参
      return curReducer(accumulator, action)
    }, state)
  }
}
