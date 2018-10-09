import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Root extends Component {
  constructor() {
    super()
  }

  getChildContext() {
    console.log(`getChildContext`)
    return this.props.context
  }

  render() {
    return (
      <div className="mvc-root">
        {this.props.children}
      </div>
    )
  }
}

Root.childContextTypes = {
  state: PropTypes.object,
  events: PropTypes.object,
  actions: PropTypes.object
}
