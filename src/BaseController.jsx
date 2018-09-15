import React, { Component } from 'react'

export default class BaseController extends Component {
  constructor() {
    super()
    this.View = null
    this.Model = null

    console.log(`base ctrl constructor`)
  }

  setStateAsync(obj) {
    return new Promise((resolve) => {
      this.setState(obj, resolve);
    });
  }

  render() {
    const View = this.View
    return (<View />)
  }
}
