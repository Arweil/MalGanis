import * as React from 'react';
import CtrlProxy from '../component/CtrlProxy';
import ViewProxy from '../component/ViewProxy';
import Root from '../component/Root';
import * as jsCookie from 'js-cookie';
import * as queryString from 'query-string';
import * as isomorphicFetch from 'isomorphic-fetch';
import { History } from 'history';
import {
  PropsStrFun, PropsStrAny,
  AppModelObjProps, CtrlStoreObjProps, CtrlLocationObjProps, InitFunParams } from '../types';

export default class BaseController {
  protected View: React.SFC;
  protected Model: AppModelObjProps;
  protected store: CtrlStoreObjProps;
  protected events: PropsStrFun;
  protected history: History<any>;
  protected location: CtrlLocationObjProps;

  protected cookie: typeof jsCookie;
  protected queryString: typeof queryString;
  protected fetch: typeof fetch;

  protected getInitialState: (state: any) => Promise<any>;
  protected pageBeforeRender: () => Promise<any>;

  constructor() {
    this.View = () => null;
    this.Model = {
      namespace: '',
      state: {},
      reducers: {},
    };

    this.store = {
      getState: () => { return; },
      actions: {},
    };
    this.events = {};
    // @ts-ignore
    this.history = null;
    this.location = {
      query: {},
      hash: {},
      params: {},
    };

    this.cookie = jsCookie;
    this.queryString = queryString;
    this.fetch = isomorphicFetch.default;

    this.getInitialState = state => Promise.resolve(state);
    this.pageBeforeRender = () => Promise.resolve();
  }

  public async init({ app, routerMatch }: InitFunParams) {
    this.modelTypeInit();

    // 处理页面初始化state
    if (this.getInitialState) {
      const newState = await this.getInitialState(this.Model.state).catch(() => {
        return Promise.reject({
          msg: 'life cycle getInitialState error',
        });
      });
      this.Model.state = newState;
    }

    // bind events
    this.combineEvents(this);

    // create page reducer
    app.mergeReducer(this.Model);

    this.store.getState = app._store.getState;

    // store.actions
    Object.keys(this.Model.reducers).forEach((reducerKey) => {
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
        <ViewProxy view={this.View} />
        <CtrlProxy controller={this} />
      </Root>
    );
  }

  // 绑定 handler 的 this 值为 controller 实例
  protected combineEvents(source: PropsStrAny) {
    Object.keys(source).forEach((key) => {
      const value = source[key];
      if (key.startsWith('on') && typeof value === 'function') {
        this.events[key] = value.bind(this);
      }
    });
  }

  /**
   * 对this.Model进行简单的类型的初始化处理
   *
   * @private
   * @memberof BaseController
   */
  private modelTypeInit() {
    this.Model.namespace = this.Model.namespace || this.constructor.name;
    this.Model.state = this.Model.state || {};
    this.Model.reducers = this.Model.reducers || {};
  }
}
