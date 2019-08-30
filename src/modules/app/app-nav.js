import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { t } from '../../services/label-service';

export class AppNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuVisible: false,
      menuClass: '',
      links: {
        'app.nav.links.home': '/',
        'app.nav.links.projects': '/projects/',
        'app.nav.links.cv': '/cv/',
        'app.nav.links.blog': '/blog/',
        'app.nav.links.contact': '/contact-me/',
      },
    };
  }

  getNavLinks() {
    const links = Object.keys(this.state.links).map(l => t(l));
    return links.map((link, index) => {
      return (
        <Link to={Object.values(this.state.links)[index] || '#'} key={index}>
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
          <div className="main-nav__links--menu" onClick={this.toggleMenu}>
            <img src="/img/menu.png" alt="" />
          </div>
          {this.state.menuVisible && (
            <div
              className="main-nav__links--overlay"
              onClick={this.toggleMenu}
            />
          )}
          <ul className={`main-nav__links ${this.state.menuClass}`}>
            {this.getNavLinks()}
          </ul>
        </div>
      </nav>
    );
  }

  toggleMenu = () => {
    this.setState(prevState => ({
      menuVisible: !prevState.menuVisible,
      menuClass: prevState.menuClass.length === 0 ? 'open' : '',
    }));
  };

  convertIndex(index) {
    return index < 9 ? `0${index + 1}` : index + 1;
  }

  render() {
    return this.getNavContents();
  }
}

AppNav.propTypes = {
  transparentBackground: PropTypes.bool,
};
