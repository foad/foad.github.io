import React from 'react';

import { t } from '../../services/label-service';
import { SectionHeader } from '../../components/headers/section-header';

export class FeaturedProject extends React.Component {
  render() {
    return (
      <section className="featured-project section">
        <SectionHeader>{t('general.featuredProject')}</SectionHeader>
      </section>
    );
  }
}
