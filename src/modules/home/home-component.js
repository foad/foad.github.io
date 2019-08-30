import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { init } from '../../services/home-service';
import { setTransparentNav } from '../../reducers/app-reducers';

import './home.scss';
import { HomeHeader } from './home-header';
import { FeaturedProject } from './featured-project';
import { AboutMe } from './about-me';

class HomeComponent extends React.Component {
  componentDidMount() {
    this.props.init();
    this.props.setTransparentNav(true);
  }

  render() {
    return (
      <div className="home-container">
        <HomeHeader />
        <FeaturedProject />
        <AboutMe />
      </div>
    );
  }
}

HomeComponent.propTypes = {
  init: PropTypes.func.isRequired,
  setTransparentNav: PropTypes.func.isRequired,
};

export const Home = connect(
  null,
  {
    init,
    setTransparentNav,
  }
)(HomeComponent);
