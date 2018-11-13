import * as React from 'react'
import { mvcConnect } from '../hoc/connect';

interface ViewProps {
  events: object,
  state: object,
}

interface ViewProxyProps {
  events: object,
  state: object,
  view: React.ComponentClass<ViewProps, object>
}

class ViewProxy extends React.Component<ViewProxyProps> {
  render() {
    const View = this.props.view
    const { events, state } = this.props
    return (
      <View events={events} state={state} />
    )
  }
}

export default mvcConnect((args: any) => {
  return args
})(ViewProxy)
