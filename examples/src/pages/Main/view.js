import React, { Component } from 'react';
import TestA from './components/TestA';

export default class MainView extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>This is Page View</h1>
        <TestA />
      </div>
    );
  }
}
