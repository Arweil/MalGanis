import React, { Component } from 'react'

export default class Root extends Component {
  constructor() {
    super()
    console.log(`root constructor`)
  }

  componentWillMount() {
    console.log(`root componentWillMount`)
  }

  componentDidMount() {
    console.log(`root componentDidMount`)
  }

  render() {
    console.log(`root render`)
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
