import * as React from 'react'
import * as PropTypes from 'prop-types'

interface ConnectorState {
  stateProps: object
}

export function mvcConnect(mapToProps: Function) {
  return (WrappedComponent: React.ComponentClass) => {
    class Connector extends React.Component<any, ConnectorState> {
      private unsubscribe: Function;
      
      constructor(props: any) {
        super(props)
        this.state = {
          stateProps: {}
        }

        this.unsubscribe = null
      }

      static contextTypes = {
        events: PropTypes.object,
        actions: PropTypes.object,
        store: PropTypes.object
      }

      componentWillMount() {
        const { store } = this.context
        this._updateProps()
        this.unsubscribe = store.subscribe(() => this._updateProps())
      }

      _updateProps() {
        const { store, events, actions } = this.context
        let stateProps = mapToProps({
          state: store.getState(),
          events,
          actions
        })

        this.setState({
          stateProps
        })
      }

      componentWillUnmount() {
        this.unsubscribe()
      }

      render() {
        return <WrappedComponent {...this.props} {...this.state.stateProps} />
      }
    }

    return Connector;
  }
}
