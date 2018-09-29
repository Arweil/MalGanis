import React, { Component } from 'react'

export default class componentName extends Component {
  render() {
    const View = this.props.view
    const { events } = this.props
    return (
      <View events={events} />
    )
  }
}
