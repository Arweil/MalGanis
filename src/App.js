import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import createHistory from "history/createBrowserHistory";

import finReducer from './model/mergeReducerObj.js';

import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
  push
} from "react-router-redux";

let app = {
  _store: null,
  _history: null,
  _appReducer: {},
  mergeReducer
}

/**
 * 创建app全局reducer
 */
function createReducer() {
  const reducers = {
    router: routerReducer,
    ...app._appReducer
  }

  return combineReducers(reducers)
}

/**
 * 合并页面reducer
 * @param {*} m model
 */
function mergeReducer(m) {
  if (!m.namespace || !m.reducers) {
    return;
  }

  app._appReducer[m.namespace] = finReducer(m.reducers, m.state);

  app._store.replaceReducer(createReducer());
}

/**
 * 应用最高层组件
 */
const baseRender = ({ store, history, appRouter }) => {
  return () => (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {appRouter({ app, history })}
      </ConnectedRouter>
    </Provider>
  )
}

/**
 * 创建app
 */
export default ({ appRouter, appStore, el }) => {
  const history = createHistory();

  const middleware = routerMiddleware(history);

  app._appReducer['app'] = appStore;

  /* eslint-disable no-underscore-dangle */
  const store = createStore(
    createReducer(),
    compose(applyMiddleware(middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  );
  /* eslint-enable */

  app._store = store;
  app._history = history;

  const BaseRender = baseRender({ store, history, appRouter })

  if (el) {
    ReactDOM.render(<BaseRender />, document.querySelector(el))
  } else {
    return <BaseRender />
  }
}
