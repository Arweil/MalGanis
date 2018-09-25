import React, { Component } from 'react';
import propTypes from 'prop-types';
import logo from '@/layout/logo.svg';
import app from '@/layout/App.less';

import { Link } from '../../../dist/GalGanis.js';

import { hot } from 'react-hot-loader';

class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className={app.App}>
        <header className={app['App-header']}>
          <img src={logo} className={app['App-logo']} alt="logo" />
          <h1 className={app['App-title']}>Welcome to React</h1>
        </header>
        <p className={app['App-intro']}>
          To get started, edit src/App.js and save to reload.
        </p>

        <Link to="/">Main</Link>
        <Link to="/PageA">PageA</Link>

        {children}
      </div>
    );
  }
}

export default hot(module)(Layout);
