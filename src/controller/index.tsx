import * as React from 'react';
import CtrlProxy from '../component/CtrlProxy';
import ViewProxy from '../component/ViewProxy';
import Root from '../component/Root';
import * as jsCookie from 'js-cookie';
import * as queryString from 'query-string';
import { PropsStrFun, PropsStrAny } from '../types/index';
import { AppModelObjProps, CtrlStoreObjProps, InitFunParams } from '../types';

export default class BaseController {
  protected view: React.SFC;
  protected model: AppModelObjProps;
  protected store: CtrlStoreObjProps;
  protected events: PropsStrFun;
  protected cookie: any;
  protected queryString: any;
  protected history: object;
  protected location: object;

  protected getInitialState: (state: any) => Promise<any>;
  protected pageBeforeRender: () => Promise<any>;

  constructor() {
    this.view = () => null;
    this.store = {
      getState: () => { return; },
      actions: {},
    };
    this.model = {
      namespace: '',
      state: {},
      reducers: {},
    };

    this.events = {};

    // @ts-ignore
    this.cookie = jsCookie.default;
    this.queryString = queryString;

    this.history = {};

    this.location = {};

    this.getInitialState = state => Promise.resolve(state);
    this.pageBeforeRender = () => Promise.resolve();
  }

  public async init({ app, routerMatch }: InitFunParams) {
    // 处理页面初始化state
    if (this.getInitialState) {
      const newState = await this.getInitialState(this.model.state).catch(() => {
        return Promise.reject({
          msg: 'life cycle getInitialState error',
        });
      });
      this.model.state = newState;
    }

    // bind events
    this.combineEvents(this);

    // create page reducer
    if (this.model) {
      this.model.namespace = this.model.namespace || this.constructor.name;
      app.mergeReducer(this.model);
    }

    this.store = {
      getState: app._store.getState,
      actions: {},
    };

    // store.actions
    Object.keys(this.model.reducers || {}).forEach((reducerKey) => {
      this.store.actions[reducerKey] = (payload: object) => {
        app._store.dispatch({ type: reducerKey, ...payload });
      };
    });

    // create history
    this.history = app._history;

    this.location = {
      query: this.queryString.parse(window.location.search),
      hash: this.queryString.parse(window.location.hash),
      params: routerMatch.params,
    };
  }

  public async render() {
    // pageBeforeRender 生命周期
    if (this.pageBeforeRender) {
      await this.pageBeforeRender().catch(() => {
        return Promise.reject({
          msg: 'life cycle pageBeforeRender error',
        });
      });
    }

    const componentContext = {
      events: this.events,
      actions: this.store.actions,
    };

    return (
      <Root context={componentContext} >
        <ViewProxy view={this.view} />
        <CtrlProxy controller={this} />
      </Root>
    );
  }

  // 绑定 handler 的 this 值为 controller 实例
  private combineEvents(source: PropsStrAny) {
    Object.keys(source).forEach((key) => {
      const value = source[key];
      if (key.startsWith('on') && typeof value === 'function') {
        this.events[key] = value.bind(this);
      }
    });
  }
}
