import * as React from 'react'
import { match } from 'react-router-dom'

interface DynamicComponentProps {
  match: match,
  loadedUserComponent: Function,
}

interface DynamicComponentState {
  AsyncComponent: Function
}

export default class DynamicComponent extends React.Component<DynamicComponentProps, DynamicComponentState> {
  private mounted: boolean;

  constructor(props: any) {
    super(props)
    this.state = {
      AsyncComponent: null
    }
    this.mounted = false;
    this.load();
  }

  componentDidMount() {
    this.mounted = true;
  }

  async load() {
    const m = await this.props.loadedUserComponent({ match: this.props.match });
    const AsyncComponent = m.default || m;
    if (this.mounted) {
      this.setState({
        AsyncComponent
      })
    } else {
      // @ts-ignore: 直接赋值无需触发渲染
      this.state.AsyncComponent = AsyncComponent
    }
  }

  render() {
    const { AsyncComponent } = this.state;

    if (AsyncComponent) {
      return AsyncComponent
    }

    return null
  }
}
