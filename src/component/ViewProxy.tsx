import * as React from 'react';
import { mvcConnect } from '../hoc/connect';
import { ViewProxyComponentProps } from '../types';

class ViewProxy extends React.Component<ViewProxyComponentProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const View = this.props.view;
    const { events, stateInPage, stateInGlobal } = this.props;
    return (
      <View events={events} stateInPage={stateInPage} stateInGlobal={stateInGlobal} />
    );
  }
}

export default mvcConnect((args: any) => {
  return args;
})(ViewProxy);
