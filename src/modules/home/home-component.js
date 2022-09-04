import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setTransparentNav } from '../../reducers/app-reducers';

import './home.scss';
import { HomeHeader } from './home-header';

class HomeComponent extends React.Component {
  componentDidMount() {
    this.props.setTransparentNav(true);
  }

  render() {
    return (
      <div className="home-container">
        <HomeHeader />
      </div>
    );
  }
}

HomeComponent.propTypes = {
  setTransparentNav: PropTypes.func.isRequired,
};

export const Home = connect(
  null,
  {
    setTransparentNav,
  }
)(HomeComponent);
