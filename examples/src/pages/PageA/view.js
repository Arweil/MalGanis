import React, { Component } from 'react'
import { Link } from '../../../../dist/GalGanis.js'

export default class View extends Component {
  render() {
    return (
      <div>
        <h1>This is PageA</h1>

        <Link to="/PageA/PageAA/1">Go To PageAA</Link>
      </div>
    )
  }
}
