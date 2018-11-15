import React from 'react'
import ReactComponentExt from 'malganis/component/ReactComponentExt';

export default class TestA extends ReactComponentExt {
  constructor() {
    super()

    this.state = {
      stateA: 1
    }

    this.onBtnClick = this.onBtnClick.bind(this);
    this.onGetApiData = this.onGetApiData.bind(this);
  }

  onBtnClick() {
    this.setStateAsync({ stateA: this.state.stateA + 1 });
  }

  onGetApiData() {
    this.props.getMessage();
  }

  render() {
    return (
      <div>
        <h1>This is component</h1>
        <div>{this.state.stateA}</div>
        <button onClick={this.onBtnClick}>Add</button>

        <hr />

        <div>{this.props.msg}</div>
        <button onClick={this.onGetApiData}>get data from api</button>
      </div>
    )
  }
}
