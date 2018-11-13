import * as React from 'react';
import * as PropTypes from 'prop-types';

interface ConnectorState {
  stateProps: object;
}

export function mvcConnect(mapToProps: Function) {
  return (WrappedComponent: React.ComponentClass): React.ComponentClass<any, any> => {
    class MVCConnector extends React.Component<any, ConnectorState> {
      static contextTypes = {
        events: PropTypes.object,
        actions: PropTypes.object,
        store: PropTypes.object,
      };

      private unsubscribe: () => void;

      constructor(props: any) {
        super(props);
        this.state = {
          stateProps: {},
        };

        this.unsubscribe = null;
      }

      componentWillMount() {
        const { store } = this.context;
        this.updateProps();
        this.unsubscribe = store.subscribe(() => this.updateProps());
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        return <WrappedComponent {...this.props} {...this.state.stateProps} />;
      }

      private updateProps() {
        const { store, events, actions } = this.context;
        const stateProps = mapToProps({
          events,
          actions,
          state: store.getState(),
        });

        this.setState({
          stateProps,
        });
      }
    }

    return MVCConnector;
  };
}
