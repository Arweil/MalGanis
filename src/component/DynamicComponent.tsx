import * as React from 'react';
import { match } from 'react-router-dom';
import { DynamicComponentProps, DynamicComponentState } from '../types';

export default class DynamicComponent
  extends React.Component<DynamicComponentProps, DynamicComponentState> {

  private mounted: boolean;

  constructor(props: any) {
    super(props);
    this.state = {
      AsyncComponent: null,
    };
    this.mounted = false;
    this.load();
  }

  componentDidMount() {
    this.mounted = true;
  }

  async load() {
    const m = await this.props.loadedUserComponent({ routerMatch: this.props.routerMatch });
    const ASYNC_COMPONENT = m.default || m;
    if (this.mounted) {
      this.setState({
        AsyncComponent: ASYNC_COMPONENT,
      });
    } else {
      // @ts-ignore: 直接赋值无需触发渲染
      this.state.AsyncComponent = ASYNC_COMPONENT;
    }
  }

  render() {
    const { AsyncComponent } = this.state;

    if (AsyncComponent) {
      return AsyncComponent;
    }

    return null;
  }
}
