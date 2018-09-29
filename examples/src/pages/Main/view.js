import React, { Component } from 'react';
import TestAWrapper from './components/TestAWrapper';

export default (props) => {
  const { events } = props;

  return (
    <div>
      <h1>This is Page View</h1>
      <TestAWrapper />
      <button onClick={events.onClick}>test event</button>
    </div>
  );
}
