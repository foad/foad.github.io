import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { toggleMenu } from '../../reducers/app-reducers';
import { t } from '../../services/label-service';

class AppNavComponent extends React.Component {
  getNavLinks() {
    const links = Object.keys(this.props.navLinks).map(l => t(l));
    return links.map((link, index) => {
      return (
        <Link to={Object.values(this.props.navLinks)[index] || '#'} key={index}>
          <li>
            <span className="index">{this.convertIndex(index)}</span>
            {link}
          </li>
        </Link>
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
            {t('general.name')}
            <span className="separator"> :: </span>
            <span>{t('general.role')}</span>
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
  navLinks: PropTypes.objectOf(PropTypes.string),
  toggleMenu: PropTypes.func.isRequired,
  transparentBackground: PropTypes.bool.isRequired,
};

export const AppNav = connect(
  null,
  {
    toggleMenu,
  }
)(AppNavComponent);
