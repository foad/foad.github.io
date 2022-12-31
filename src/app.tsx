import React from "react";

import { AppNav } from "./app-nav";
import sky_logo from "./img/skylogo.png";
import contact_img from "./img/contact.png";

export const App = () => {
  return (
    <>
      <AppNav />
      <div className="home-container">
        <header className="home-header">
          <div className="home-header__contents">
            <div className="home-header__name">
              <h1>Dan Foad</h1>
            </div>
            <div className="home-header__title">
              <h3>
                <img className="home-header__logo" src={sky_logo} alt="" />
                Senior Software Engineer
              </h3>
              <p>Currently working with Sky</p>
            </div>
            <div className="home-header__buttons">
              <button className="home-header__contact" type="button">
                <img src={contact_img} alt="" />
                <span>Contact Me</span>
              </button>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};
