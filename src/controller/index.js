import React from 'react';
import CtrlProxy from '../component/CtrlProxy';
import ViewProxy from '../component/ViewProxy';
import Root from '../component/Root';

export default class BaseController {
  constructor() {
    this.View = null
    this.Model = null

    this.flag = {
      mounted: false,
    }
    this.events = {};
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

  init(app) {
    this.combineEvents(this);

    if (this.Model) {
      this.Model.namespace = this.Model.namespace || this.constructor.name
      app.mergeReducer(this.Model);
    }

    this.store = app._store;
  }

  render() {
    const { View, events } = this;
    return (
      <Root>
        <ViewProxy events={events} controller={this} view={View} />
        <CtrlProxy controller={this} />
      </Root>
    )
  }
}
