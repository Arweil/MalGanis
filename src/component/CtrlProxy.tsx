import * as React from 'react';
import { PropsStrFun } from '../types/index';

interface CtrlProxyProps {
  controller: any;
}

export default class CtrlProxy extends React.Component<CtrlProxyProps> {
  constructor(props: any) {
    super(props);
  }

  componentWillMount() {
    this.emit('pageWillMount');
  }

  componentDidMount() {
    this.emit('pageDidMount');
  }

  componentWillUnmount() {
    this.emit('pageWillUnMount');
  }

  render(): () => void {
    return null;
  }

  // 触发controller中的生命周期函数
  private emit(method: string) {
    const { controller } = this.props;
    const fun = controller[method];
    if (typeof fun === 'function') {
      fun.call(controller);
    }
  }
}
