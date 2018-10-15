import React, { Component } from 'react'

export default class DynamicComponent extends Component {
  constructor(props) {
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
