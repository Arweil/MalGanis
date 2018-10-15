import React from 'react';
import CtrlProxy from '../component/CtrlProxy';
import ViewProxy from '../component/ViewProxy';
import Root from '../component/Root';
import jsCookie from 'js-cookie';
import queryString from 'query-string';

export default class BaseController {
  constructor() {
    this.View = () => null
    this.Model = null

    this.events = {};

    this.cookie = jsCookie;
    this.queryString = queryString;

    this.history = null;

    this.location = {};
  }

  // 绑定 handler 的 this 值为 controller 实例
  combineEvents(source) {
    let { events } = this
    Object.keys(source).forEach(key => {
      let value = source[key]
      if (key.startsWith('on') && typeof value === 'function') {
        events[key] = value.bind(this)
      }
    })
  }

  async _init({ app, match }) {
    // 处理页面初始化state
    if (this.getInitialState) {
      const newState = await this.getInitialState(this.Model.state).catch(() => {
        return Promise.reject({
          msg: `life cycle getInitialState error`
        })
      });
      this.Model.state = newState
    }

    // bind events
    this.combineEvents(this);

    // create page reducer
    if (this.Model) {
      this.Model.namespace = this.Model.namespace || this.constructor.name
      app.mergeReducer(this.Model);
    }

    this.store = {
      getState: app._store.getState,
      actions: {}
    }

    // store.actions
    const $this = this;
    Object.keys(this.Model.reducers || {}).forEach((reducerKey) => {
      $this.store.actions[reducerKey] = (payload) => {
        app._store.dispatch({ type: reducerKey, ...payload })
      }
    })

    // create history
    this.history = app._history;

    this.location = {
      query: this.queryString.parse(window.location.search),
      hash: this.queryString.parse(window.location.hash),
      params: match.params,
    }
  }

  async _render() {
    // pageBeforeRender 生命周期
    if (this.pageBeforeRender) {
      const newState = await this.pageBeforeRender().catch(() => {
        return Promise.reject({
          msg: `life cycle pageBeforeRender error`
        })
      });
    }

    const { View, events } = this;

    const componentContext = {
      events,
      actions: this.store.actions,
    }

    return (
      <Root context={componentContext}>
        <ViewProxy view={View} />
        <CtrlProxy controller={this} />
      </Root>
    )
  }
}
