import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { init } from '../../services/home-service';
import { setTransparentNav } from '../../reducers/app-reducers';

import './home.scss';
import HomeHeader from './home-header';

export class HomeContainer extends React.Component {
  componentDidMount() {
    this.props.init();
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

HomeContainer.propTypes = {
  init: PropTypes.func.isRequired,
  setTransparentNav: PropTypes.func.isRequired,
};

export default connect(
  null,
  {
    init,
    setTransparentNav,
  }
)(HomeContainer);
