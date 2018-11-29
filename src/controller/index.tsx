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
import { dispatchPrefix } from '../model/prefix';

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

  constructor() {
    this.View = () => null;
    this.Model = {
      namespace: '',
      state: {},
      reducers: {},
    };

    this.store = {
      getStateInGlobal: () => { return {}; },
      getStateInPage: () => { return {}; },
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
  }

  public async init({ app, routerMatch }: InitFunParams) {
    this.modelTypeInit();

    // create history
    this.history = app._history;

    this.location = {
      query: this.queryString.parse(window.location.search),
      hash: this.queryString.parse(window.location.hash),
      params: routerMatch.params,
    };

    // @ts-ignore
    if (this.getGlobalInitialState) {
      // @ts-ignore
      const newGlobalModelArr: AppModelObjProps[] = await this.getGlobalInitialState().catch((ex: any) => {
        return Promise.reject(ex || {
          msg: 'life cycle getGlobalInitialState error',
        });
      });
      if (newGlobalModelArr) {
        newGlobalModelArr.forEach((globalModelItem: AppModelObjProps) => {
          if (globalModelItem.namespace) {
            app.mergeReducer({
              namespace: globalModelItem.namespace,
              state: globalModelItem.state || {},
              reducers: {},
            });
          } else {
            // tslint:disable-next-line:no-console
            console.warn('warn in getGlobalInitialState, must has namespace in type AppModelObjProps');
          }
        });
      }
    }

    // 处理页面初始化state
    // @ts-ignore
    if (this.getPageInitialState) {
      // @ts-ignore
      const newState = await this.getPageInitialState(this.Model.state).catch((ex: any) => {
        return Promise.reject(ex || {
          msg: 'life cycle getPageInitialState error',
        });
      });
      this.Model.state = newState;
    }

    // bind events
    this.combineEvents(this);

    this.Model.reducers = {
      ...this.Model.reducers,
      UPDATE_STATE: (state, payload) => {
        return {
          ...state,
          ...payload,
        };
      },
    };

    // create page reducer
    app.mergeReducer(this.Model);

    this.store.getStateInGlobal = app._store.getState;
    this.store.getStateInPage = () => {
      return app._store.getState()[this.Model.namespace];
    };

    const dispatch = dispatchPrefix(app._store.dispatch, this.Model);

    // store.actions
    Object.keys(this.Model.reducers).forEach((reducerKey) => {
      this.store.actions[reducerKey] = (payload: object) => {
        dispatch({ type: reducerKey, ...payload });
      };
    });
  }

  public async render() {
    // pageBeforeRender 生命周期
    // @ts-ignore
    if (this.pageBeforeRender) {
      // @ts-ignore
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
        <ViewProxy view={this.View} namespace={this.Model.namespace} />
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
