import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from "history/createBrowserHistory";

import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
  push
} from "react-router-redux";


const baseRender = ({ store, history, appRouter }) => {
  return () => (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {appRouter({ history })}
      </ConnectedRouter>
    </Provider>
  )
}

export default ({ appRouter, appStore, el }) => {
  const history = createHistory();

  const middleware = routerMiddleware(history);

  const store = createStore(
    combineReducers({
      router: routerReducer
    }),
    applyMiddleware(middleware)
  );

  const BaseRender = baseRender({ store, history, appRouter })

  if (el) {
    ReactDOM.render(<BaseRender />, document.querySelector(el))
  } else {
    return <BaseRender />
  }
}
