import React, { Component } from 'react'
import { mvcConnect } from '../hoc/connect';

class ViewProxy extends Component {
  render() {
    const View = this.props.view
    const { events, state } = this.props
    return (
      <View events={events} state={state} />
    )
  }
}

export default mvcConnect(args => args)(ViewProxy)
