import React from 'react'
import { Router, Route, Switch } from '../../../dist/GalGanis.js'

import Main from '@/pages/Main/controller.js'

export default ({ app, history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={() => new Main().render()} />
      </Switch>
    </Router>
  )
}
