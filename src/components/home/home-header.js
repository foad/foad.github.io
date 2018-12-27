import React from 'react';

import { t } from '../../services/label-service';
import AppNav from '../app/app-nav';

import HomeHeaderPipeline from './home-header-pipeline';

export default class HomeHeader extends React.Component {
  getHeader() {
    return (
      <div className="home-header__contents">
        <h1 className="home-header__name">{t('general.name')}</h1>
        <div className="home-header__title">
          <h3>
            <img className="home-header__logo" src="/img/skylogo.png" alt="" />
            {t('general.role')}
          </h3>
          <p>{t('home.header.subline')}</p>
        </div>
        <div className="home-header__buttons">
          <button className="home-header__contact" type="button">
            <img src="/img/contact.png" alt="" />
            <span>{t('home.header.contact')}</span>
          </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <header className="home-header">
        <AppNav />
        {this.getHeader()}
        <HomeHeaderPipeline />
      </header>
    );
  }
}

HomeHeader.propTypes = {};
