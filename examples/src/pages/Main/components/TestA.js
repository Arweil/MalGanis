import React from 'react'
import { ReactComponentExt } from '../../../../../dist/GalGanis';

export default class componentName extends ReactComponentExt {
  constructor() {
    super()

    this.state = {
      stateA: 1
    }

    this.onBtnClick = this.onBtnClick.bind(this);
  }

  onBtnClick() {
    this.setStateAsync({ stateA: this.state.stateA + 1 });
  }

  render() {
    return (
      <div>
        <h1>This is component</h1>
        <span>{this.state.stateA}</span>
        <button onClick={this.onBtnClick}>Add</button>
      </div>
    )
  }
}
