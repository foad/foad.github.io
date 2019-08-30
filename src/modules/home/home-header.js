import React from 'react';

import { t } from '../../services/label-service';

import { HomeHeaderPipeline } from './home-header-pipeline';

export class HomeHeader extends React.Component {
  render() {
    return (
      <header className="home-header">
        <div className="home-header__contents">
          <div className="home-header__name">
            <h1>{t('general.name')}</h1>
          </div>
          <div className="home-header__title">
            <h3>
              <img
                className="home-header__logo"
                src="/img/skylogo.png"
                alt=""
              />
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
        <HomeHeaderPipeline />
      </header>
    );
  }
}

HomeHeader.propTypes = {};
