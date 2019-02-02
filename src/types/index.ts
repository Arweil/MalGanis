import { Store, ReducersMapObject } from 'redux';
import { History } from 'history';
import { match } from 'react-router-dom';
import { OutputParams } from 'query-string';

export interface PropsStrFun {
  [propName: string]: () => void;
}

export interface PropsStrStr {
  [propName: string]: string;
}

export interface PropsStrAny {
  [propName: string]: any;
}

// app interfaces
export interface AppObjProps {
  _store: Store;
  _history: History<any>;
  _appReducer: ReducersMapObject;
  mergeReducer: (m: AppModelObjProps) => void;
}

export enum EnumHistoryMode {
  hash = 'hash',
  browser = 'browser',
}

export interface AppFunParams {
  appRouter: ({ app, history }: { app: object; history: History<any> }) => React.ReactNode;
  el: string;
  historyMode: EnumHistoryMode;
}

export interface AppModelObjProps {
  namespace: string;
  state: object;
  reducers: ReducersMapObject;
}

// dynamic interfaces
export interface LoadedUserComponentProps {
  routerMatch: match;
}

export interface RouterConfigObjProps {
  app: AppObjProps;
  controller: () => Promise<any>;
}

// DynamicComponent interfaces
export interface DynamicComponentProps {
  routerMatch: match;
  loadedUserComponent: ({ routerMatch }: LoadedUserComponentProps) => Promise<any>;
}

export interface DynamicComponentState {
  AsyncComponent: React.ReactNode;
}

// controller interfaces
export interface CtrlStoreObjProps {
  getStateInGlobal: () => any;
  getStateInPage: () => any;
  actions: ReducersMapObject;
}

export interface InitFunParams {
  app: AppObjProps;
  routerMatch: match;
}

export interface CtrlLocationObjProps {
  query: OutputParams;
  hash: OutputParams;
  params: {};
}

// view interfaces
export interface ViewComponentProps {
  events: object;
  stateInPage: object;
  stateInGlobal: object;
}

export interface ViewProxyComponentProps {
  events: object;
  stateInPage: object;
  stateInGlobal: object;
  view: React.ComponentClass<ViewComponentProps, {}>;
}

export interface MVCConnectorComponentState {
  stateProps: object;
}
