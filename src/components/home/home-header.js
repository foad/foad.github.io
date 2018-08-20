import React from "react";

import AppNav from '../app/app-nav'

export default class HomeHeader extends React.Component {
  getHeader() {
    return (
      <div className="home-header__contents">
        <h1 className="home-header__name">Dan<wbr />Foad</h1>
        <div className="home-header__title">
          <h3>Associate Software Developer</h3>
          <p>Currently working at Sky</p>
        </div>
      </div>
    )
  }
  
  render() {
    return (
      <header className="home-header">
        <AppNav />
        { this.getHeader() }
      </header> 
    )
  }
}

HomeHeader.propTypes = {
  
};
