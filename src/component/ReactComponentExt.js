import React, { Component } from 'react'

export default class ReactComponentExt extends Component {
  setStateAsync(obj) {
    return new Promise((resolve) => {
      this.setState(obj, resolve);
    });
  }
}
