import React, { Component } from 'react'
import { Link } from 'malganis/router'

export default class View extends Component {
  render() {
    return (
      <div>
        <h1>This is PageAA</h1>
        <img src={require('@/img/a.jpg')} style={{ width: '100%' }} />
      </div>
    )
  }
}
