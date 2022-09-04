import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { toggleMenu } from '../../reducers/app-reducers';

class AppNavComponent extends React.Component {
  getNavLinks() {
    const links = {
      Home: '/',
      Projects: '/projects/',
      CV: 'https://github.com/foad/foad.dev/raw/master/public/CV.pdf',
      LinkedIn: 'https://uk.linkedin.com/in/danfoad',
      'Contact Me': '/contact-me/',
    };
    return Object.entries(links).map(([title, uri], index) => {
      if (uri[0] === '/') {
        return (
          <Link to={uri} key={uri}>
            <li>
              <span className="index">{this.convertIndex(index)}</span>
              {title}
            </li>
          </Link>
        );
      }
      return (
        <a href={uri} key={uri}>
          <li>
            <span className="index">{this.convertIndex(index)}</span>
            {title}
          </li>
        </a>
      );
    });
  }

  getNavContents() {
    const navClass = this.props.transparentBackground
      ? 'main-nav--transparent'
      : '';

    return (
      <nav className={`main-nav ${navClass}`}>
        <h1 className="main-nav__title">
          <a href="/">
            Dan Foad
            <span className="separator"> :: </span>
            <span>Engineering Manager</span>
          </a>
          <div className="main-nav__edge" />
        </h1>
        <div className="main-nav__slant" />
        <div className="main-nav__links--desktop">
          <ul className="main-nav__links">{this.getNavLinks()}</ul>
        </div>
        <div className="main-nav__links--mobile">
          <div
            className="main-nav__links--menu"
            onClick={this.props.toggleMenu}
          >
            <img src="/img/menu.png" alt="" />
          </div>
          {this.props.expanded && (
            <div
              className="main-nav__links--overlay"
              onClick={this.props.toggleMenu}
            />
          )}
          <ul
            className={`main-nav__links ${this.props.expanded ? 'open' : ''}`}
          >
            {this.getNavLinks()}
          </ul>
        </div>
      </nav>
    );
  }

  convertIndex(index) {
    return index < 9 ? `0${index + 1}` : index + 1;
  }

  render() {
    return this.getNavContents();
  }
}

AppNavComponent.propTypes = {
  expanded: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  transparentBackground: PropTypes.bool.isRequired,
};

export const AppNav = connect(
  null,
  {
    toggleMenu,
  }
)(AppNavComponent);
