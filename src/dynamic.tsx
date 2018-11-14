import * as React from 'react';
import DynamicComponent from './component/DynamicComponent';
import { RouteComponentProps } from 'react-router-dom';
import { LoadedUserComponentProps, RouterConfigObjProps } from './types';

export default (config: RouterConfigObjProps) => {
  const { app, controller: promiseController } = config;

  const loadedUserComponent = ({ routerMatch }: LoadedUserComponentProps) => {
    return promiseController().then(async (controller: any) => {
      const controllerDefault = controller.default;
      const instance = new controllerDefault();

      try {
        await instance.init({ app, routerMatch });
        return instance.render();
      } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err.msg);
        return false;
      }
    });
  };

  // 注意组件props的执行时机
  // 载入“动态组件(DynamicComponent)”之后再去加载controller组件
  return (props: RouteComponentProps) =>
    <DynamicComponent loadedUserComponent={loadedUserComponent} routerMatch={props.match} />;
};
