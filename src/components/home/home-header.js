import React from "react";

import AppNav from '../app/app-nav'

export default class HomeHeader extends React.Component {
  getHeader() {
    return (
      <div className="home-header__contents">
        <h1 className="home-header__name">Dan Foad</h1>
        <div className="home-header__title">
          <h3>
            <img className="home-header__logo" src="/skylogo.png" alt="" />
            Associate Software Developer
          </h3>
          <p>Currently working with NowTV</p>
        </div>
        <div className="home-header__buttons">
          <button className="home-header__contact"><img src="/contact.png" alt=""/>Contact Me</button>
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
