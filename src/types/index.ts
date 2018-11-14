import { Store, ReducersMapObject } from 'redux';
import { History } from 'history';
import { match } from 'react-router-dom';

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
  _history: object;
  _appReducer: ReducersMapObject;
  mergeReducer: (m: AppModelObjProps) => void;
}

export interface AppFunParams {
  appRouter: ({ app, history }: { app: object; history: History<any> }) => React.ReactNode;
  appStore: {};
  el: string;
}

export interface BaseRenderFunParams {
  store: Store;
  history: History<any>;
  appRouter: ({ app, history }: { app: object; history: History<any> }) => React.ReactNode;
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
  getState: () => any;
  actions: ReducersMapObject;
}

export interface InitFunParams {
  app: AppObjProps;
  routerMatch: match;
}

// view interfaces
export interface ViewComponentProps {
  events: object;
  state: object;
}

export interface ViewProxyComponentProps {
  events: object;
  state: object;
  view: React.ComponentClass<ViewComponentProps, object>;
}

export interface MVCConnectorComponentState {
  stateProps: object;
}
