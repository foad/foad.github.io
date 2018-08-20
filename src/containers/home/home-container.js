import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import { init } from '../../services/home-service'

import HomeHeader from '../../components/home/home-header'

class HomeContainer extends React.Component {
  componentDidMount() {
    this.props.init()
  }

  render() {
    return (
      <div className="home-container">
        <HomeHeader />
      </div>
      )
  }
}

HomeContainer.propTypes = {
  
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
