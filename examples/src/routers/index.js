import React from 'react'
import { Router, Route, Switch } from '../../../dist/GalGanis.js'

export default ({ app, history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={() => <div>111</div>} />
      </Switch>
    </Router>
  )
}
