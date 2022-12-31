import React from "react";

export const AppNav = () => {
  return (
    <nav className="main-nav main-nav--transparent">
      <h1 className="main-nav__title">
        <a href="/">
          Dan Foad
          <span className="separator"> :: </span>
          <span>Senior Software Engineer</span>
        </a>
        <div className="main-nav__edge" />
      </h1>
      <div className="main-nav__slant" />
    </nav>
  );
};
