import React, { Component } from 'react';

function sleep(d) {
  for (var t = Date.now(); Date.now() - t <= d;);
}

export default class MainView extends Component {
  constructor(props) {
    super(props)
    console.log(`view constructor`)
  }

  componentWillMount() {
    console.log(`view componentWillMount`)
  }

  componentDidMount() {
    console.log(`view componentDidMount`)
  }

  render() {
    console.log(`view render`)

    sleep(2000)

    return (
      <h1>Hello world</h1>
    );
  }
}
