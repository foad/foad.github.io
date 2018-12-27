import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { init as initLabels } from '../../services/label-service';
import HomeContainer from '../../containers/home/home-container';

import { appSelector } from './app-selector';

import './app.scss';

export class App extends Component {
  componentDidMount() {
    this.props.initLabels();
  }

  render() {
    if (this.props.labelsLoading) return <div />;

    return (
      <div className="app">
        <HomeContainer />
      </div>
    );
  }
}

App.propTypes = {
  labelsLoading: PropTypes.bool,
  initLabels: PropTypes.func.isRequired,
};

export default connect(
  appSelector,
  {
    initLabels,
  }
)(App);
