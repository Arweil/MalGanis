import * as React from 'react'
import * as PropTypes from 'prop-types'

interface Props {
  context: object
}

export default class Root extends React.Component<Props> {
  static childContextTypes = {
    state: PropTypes.object,
    events: PropTypes.object,
    actions: PropTypes.object
  }

  getChildContext() {
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
