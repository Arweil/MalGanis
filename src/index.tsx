import React, { Component } from 'react';

interface ISomeObject {
  [key: string]: Function;
}

interface Props {
  controller: ISomeObject
}

export default class CtrlProxy extends Component<Props, {}> {
  constructor(props) {
    super(props);
  }

  // 触发controller中的生命周期函数
  emit(method: string) {
    const { controller } = this.props;
    const fun = controller[method];
    if (typeof fun === 'function') {
      fun.call(controller);
    }
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

  render(): JSX.Element {
    return null;
  }
}
