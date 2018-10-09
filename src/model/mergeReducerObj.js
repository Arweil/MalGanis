// 用来处理 model 中的reducers 对象
// 把reducers对象和并成为一个reducer

import { isObject } from '../utils/index.js';

export default function finReducer(reducerObj, initialState) {
  if (!isObject(reducerObj)) {
    return (state, action) => state;
  }

  const reducerList = Object.keys(reducerObj).map((key) => {
    return (state, action) => {
      const { type } = action;
      if (key === type) {
        return reducerObj[key](state, action)
      }
      return state
    }
  })

  return (state = initialState, action) => {
    return reducerList.reduce((accumulator, curReducer) => {
      // 上一个state作为入参
      return curReducer(accumulator, action)
    }, state)
  }
}
