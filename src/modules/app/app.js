import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { setTransparentNav } from '../../reducers/app-reducers';
import { Home } from '../home/home-component';

import { AppNav } from './app-nav';
import { appSelector } from './app-selector';

import './app.scss';
import '../../components/headers/headers.scss';

class AppComponent extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname === this.props.location.pathname) return;

    if (this.props.transparentNav) this.props.setTransparentNav(false);
  }

  render() {
    return (
      <React.Fragment>
        <AppNav
          expanded={this.props.navExpanded}
          transparentBackground={this.props.transparentNav}
        />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </React.Fragment>
    );
  }
}

AppComponent.propTypes = {
  navExpanded: PropTypes.bool.isRequired,
  transparentNav: PropTypes.bool,
  setTransparentNav: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
    state: PropTypes.object,
  }).isRequired,
};

export const App = connect(
  appSelector,
  {
    setTransparentNav,
  }
)(AppComponent);
