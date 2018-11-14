import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { History } from 'history';

import mergeReducerObj from './model/mergeReducerObj';
import { AppObjProps, AppModelObjProps, AppFunParams } from './types';

import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
} from 'react-router-redux';

/**
 * 创建app
 */
export default ({ appRouter, appStore, el }: AppFunParams): React.ReactNode | void => {
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

  const app: AppObjProps = {
    mergeReducer,
    _store: store,
    _history: history,
    _appReducer: {},
  };

  /**
   * 应用最高层组件
   */
  const baseRender = () => {
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
