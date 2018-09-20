import React, { Component } from 'react'

export default class Root extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="mvc-root">
        {this.props.children}
      </div>
    )
  }
}
