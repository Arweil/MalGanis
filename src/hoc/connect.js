import React, { Component } from 'react'
import PropTypes from 'prop-types'

export function mvcConnect(mapToProps) {
  return (WrappedComponent) => {
    class Connector extends Component {
      constructor() {
        super()
        this.state = {
          stateProps: {}
        }

        this.unsubscribe = null
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

    Connector.contextTypes = {
      events: PropTypes.object,
      actions: PropTypes.object,
      store: PropTypes.object
    }

    return Connector;
  }
}
