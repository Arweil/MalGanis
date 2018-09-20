import React, { Component } from 'react';

export default class CtrlProxy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 1
    }
  }

  emit(method) {
    const { controller } = this.props;
    const fun = controller[method];
    if (typeof fun === 'function') {
      fun.call(this);
    }
  }

  componentWillMount() {
    this.emit('pageWillMount');
  }

  async componentDidMount() {
    const { controller } = this.props;
    if (!controller.flag.mounted) {
      this.emit('pageFirstMount');
      controller.flag.mounted = true;
    }
    this.emit('pageDidMount');
  }

  render() {
    console.log('page render');
    return (null);
  }
}