import React from 'react';

import { t } from '../../services/label-service';
import { SectionHeader } from '../../components/headers/section-header';

export default class AboutMe extends React.Component {
  render() {
    return (
      <section className="about-me section">
        <SectionHeader>{t('general.aboutMe')}</SectionHeader>
      </section>
    );
  }
}
