import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { init as initLabels } from '../../services/label-service';
import { setTransparentNav } from '../../reducers/app-reducers';
import { Home } from '../home/home-component';
import { CV } from '../cv/cv-component';

import { AppNav } from './app-nav';
import { appSelector } from './app-selector';

import './app.scss';
import '../../components/headers/headers.scss';

class AppComponent extends Component {
  componentDidMount() {
    this.props.initLabels();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname === this.props.location.pathname) return;

    if (this.props.transparentNav) this.props.setTransparentNav(false);
  }

  render() {
    if (this.props.labelsLoading) return <div />;

    return (
      <React.Fragment>
        <AppNav
          navLinks={this.props.navLinks}
          expanded={this.props.navExpanded}
          transparentBackground={this.props.transparentNav}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cv/" component={CV} />
        </Switch>
      </React.Fragment>
    );
  }
}

AppComponent.propTypes = {
  labelsLoading: PropTypes.bool,
  initLabels: PropTypes.func.isRequired,
  navExpanded: PropTypes.bool.isRequired,
  navLinks: PropTypes.objectOf(PropTypes.string).isRequired,
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
    initLabels,
    setTransparentNav,
  }
)(AppComponent);
