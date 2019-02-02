import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose, Store } from 'redux';
import { Provider } from 'react-redux';
import { createBrowserHistory, createHashHistory, History, HashHistoryBuildOptions } from 'history';

import mergeReducerObj from './model/mergeReducerObj';
import { AppObjProps, AppModelObjProps, AppFunParams, EnumHistoryMode } from './types';

import { addPrefixInReducers } from './model/prefix';

import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
} from 'react-router-redux';

/**
 * 创建app
 */
export default ({ appRouter, el, historyMode }: AppFunParams): React.ReactNode | void => {
  // 处理history mode
  let _historyMode: (options?: HashHistoryBuildOptions | undefined) => History<any> = createBrowserHistory;

  if (historyMode === EnumHistoryMode.hash) {
    _historyMode = createHashHistory;
  }

  const history = _historyMode({
    getUserConfirmation: (message, callback) => callback(window.confirm(message)),
  });

  const middleware = routerMiddleware(history);

  // 处理store
  let store: Store;
  // @ts-ignore: redux dev tools
  if (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    store = createStore(
      combineReducers({ router: routerReducer }),
      // @ts-ignore: redux dev tools
      compose(applyMiddleware(middleware), window.__REDUX_DEVTOOLS_EXTENSION__())
    );
  } else {
    store = createStore(
      combineReducers({ router: routerReducer }),
      compose(
        applyMiddleware(middleware)
      )
    );
  }

  const app: AppObjProps = {
    mergeReducer,
    _store: store,
    _history: history,
    _appReducer: {},
  };

  /**
   * 创建app全局reducer
   */
  function createReducer() {
    const reducers = {
      router: routerReducer,
      ...app._appReducer,
    };

    return combineReducers(reducers);
  }

  /**
   * 合并页面reducer
   * @param {*} m model
   */
  function mergeReducer(m: AppModelObjProps) {
    if (!m.namespace || !m.reducers) {
      return;
    }

    const newReducers = addPrefixInReducers(m.namespace, m.reducers);

    app._appReducer[m.namespace] = mergeReducerObj(newReducers, m.state);

    app._store.replaceReducer(createReducer());
  }

  /**
   * 应用最高层组件
   */
  const baseRender = (): React.SFC => {
    return () => (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {appRouter({ app, history })}
        </ConnectedRouter>
      </Provider>
    );
  };

  const ComponentBaseRender = baseRender();

  if (el) {
    ReactDOM.render(<ComponentBaseRender />, document.querySelector(el));
  } else {
    return <ComponentBaseRender />;
  }
};
