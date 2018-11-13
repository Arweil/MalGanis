import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { History } from 'history';

import mergeReducerObj from './model/mergeReducerObj';
import { AppObjProps, AppModelObjProps, AppFunParams, BaseRenderFunParams } from './types';

import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
} from 'react-router-redux';

const app: AppObjProps = {
  mergeReducer,
  _store: null,
  _history: null,
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

  app._appReducer[m.namespace] = mergeReducerObj(m.reducers, m.state);

  app._store.replaceReducer(createReducer());
}

/**
 * 应用最高层组件
 */
const baseRender = ({ store, history, appRouter }: BaseRenderFunParams) => {
  return () => (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {appRouter({ app, history })}
      </ConnectedRouter>
    </Provider>
  );
};

/**
 * 创建app
 */
export default ({ appRouter, appStore, el }: AppFunParams) => {
  const history: History = createBrowserHistory({
    getUserConfirmation: (message, callback) => callback(window.confirm(message)),
  });

  const middleware = routerMiddleware(history);

  // app._appReducer['app'] = appStore;

  /* eslint-disable no-underscore-dangle */
  const store = createStore(
    createReducer(),
    compose(
      applyMiddleware(middleware),
      // @ts-ignore: redux dev tools
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
  /* eslint-enable */

  app._store = store;
  app._history = history;

  const ComponentBaseRender = baseRender({ store, history, appRouter });

  if (el) {
    ReactDOM.render(<ComponentBaseRender />, document.querySelector(el));
  } else {
    return <ComponentBaseRender />;
  }
};
