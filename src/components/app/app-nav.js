import React from 'react';

export default class AppNav extends React.Component {
  convertIndex(index) {
    return index++ < 9 ? '0' + index : index;
  }

  getNavLinks() {
    const links = ['Home', 'Projects', 'CV', 'Blog', 'Contact Me'];
    return links.map((link, index) => {
      return (
        <li key={index}>
          <span className="index">{this.convertIndex(index)}</span>
          {link}
        </li>
      );
    });
  }

  getNavContents() {
    return (
      <nav className="main-nav">
        <h1 className="main-nav__title">
          <a href="/">
            Dan Foad :: <span>Associate Software Developer</span>
          </a>
          <div className="main-nav__edge" />
        </h1>
        <div className="main-nav__slant" />
        <div className="main-nav__links--container">
          <ul className="main-nav__links">{this.getNavLinks()}</ul>
        </div>
      </nav>
    );
  }

  render() {
    return this.getNavContents();
  }
}
