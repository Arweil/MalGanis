import React from 'react';
import DynamicComponent from './component/DynamicComponent.js';

export default (config) => {
  const { app, controller: promiseController } = config

  const loadedUserComponent = ({ match }) => {
    return promiseController().then(async (controller) => {
      const Controller = controller.default;
      const instance = new Controller();

      try {
        await instance._init({ app, match });
        return instance._render();
      } catch(err) {
        console.error(err.msg);
        return false;
      }
    })
  }

  // 注意组件props的执行时机
  // 载入“动态组件(DynamicComponent)”之后再去加载controller组件
  return (props) => <DynamicComponent loadedUserComponent={loadedUserComponent} {...props} />
}
