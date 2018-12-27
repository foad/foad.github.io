import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { init } from '../../services/home-service';
import '../../components/home/home.scss';
import HomeHeader from '../../components/home/home-header';

export class HomeContainer extends React.Component {
  componentDidMount() {
    this.props.init();
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
};

export default connect(
  null,
  {
    init,
  }
)(HomeContainer);
