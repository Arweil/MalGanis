import React, { Component } from 'react';

export default class CtrlProxy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 1
    }

    console.log('CtrlProxy constructor')
  }

  emit(method) {
    const { controller } = this.props;
    const fun = controller[method];
    if (typeof fun === 'function') {
      fun.call(this);
    }
  }

  componentWillMount() {
    this.emit('componentWillMount');
  }

  async componentDidMount() {
    const { controller } = this.props;
    if (!controller.flag.mounted) {
      this.emit('componentFirstMount');
      controller.flag.mounted = true;
    }
    this.emit('componentDidMount');

    for (let i = 0; i < 5; i++) {
      await this.a();
    }
  }

  async a() {
    await Promise.resolve();
    this.setState({
      test: ++this.state.test
    })
  }

  setStateAsync(obj) {
    return new Promise((resolve) => {
      this.setState(obj, resolve);
    });
  }

  render() {
    console.log('page render');
    return (null);
  }
}