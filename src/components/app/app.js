import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { init as initLabels } from '../../services/label-service';
import HomeContainer from '../../containers/home/home-container';
import CVContainer from '../../containers/cv/cv-container';

import AppNav from './app-nav';
import { appSelector } from './app-selector';

import './app.scss';

export class App extends Component {
  componentDidMount() {
    this.props.initLabels();
  }

  render() {
    if (this.props.labelsLoading) return <div />;

    return (
      <React.Fragment>
        <AppNav />
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route path="/cv" component={CVContainer} />
        </Switch>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  labelsLoading: PropTypes.bool,
  initLabels: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
    state: PropTypes.object,
  }).isRequired,
};

export default connect(
  appSelector,
  {
    initLabels,
  }
)(App);
