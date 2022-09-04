import React from 'react';

import { HomeHeaderPipeline } from './home-header-pipeline';

export class HomeHeader extends React.Component {
  render() {
    return (
      <header className="home-header">
        <div className="home-header__contents">
          <div className="home-header__name">
            <h1>Dan Foad</h1>
          </div>
          <div className="home-header__title">
            <h3>
              <img
                className="home-header__logo"
                src="/img/skylogo.png"
                alt=""
              />
              Software Engineering Manager
            </h3>
            <p>Currently working with NOW TV</p>
          </div>
          <div className="home-header__buttons">
            <button className="home-header__contact" type="button">
              <img src="/img/contact.png" alt="" />
              <span>Contact Me</span>
            </button>
          </div>
        </div>
        <HomeHeaderPipeline />
      </header>
    );
  }
}

HomeHeader.propTypes = {};
