import React, { Component } from 'react';

export default class CtrlProxy extends Component {
  constructor(props) {
    super(props);
  }

  // 触发controller中的生命周期函数
  emit(method) {
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

  render() {
<<<<<<< HEAD
    return (null);
=======
    return null;
>>>>>>> df0838092b63e7a648028fd4bbe216cc27520384
  }
}