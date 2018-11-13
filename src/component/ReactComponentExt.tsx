import * as React from 'react';

export default class ReactComponentExt extends React.Component {
  protected setStateAsync(obj: object) {
    return new Promise((resolve) => {
      this.setState(obj, resolve);
    });
  }
}
