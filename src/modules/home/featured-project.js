import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { t } from '../../services/label-service';
import { SectionHeader } from '../../components/headers/section-header';

import { featuredProjectSelector } from './featured-project-selector';

class FeaturedProjectComponent extends React.Component {
  renderFeaturedProject = () => {
    const project = this.props.featuredProject;

    if (!project) return null;

    const technologies = project.technologies.map((tech, i) => (
      <button key={i} className="tech_tag" type="button">
        {tech}
      </button>
    ));

    const title = project.title.includes('.png') ? (
      <img className="featured-project__logo" src={`/img/${project.title}`} />
    ) : (
      <h2 className="featured-project__title">{project.title}</h2>
    );

    return (
      <div className="featured-project__container">
        <div className="featured-project__details">
          <div>
            {title}
            <p className="featured-project__description">
              {project.description}
            </p>
            <div className="featured-project__technologies">{technologies}</div>
          </div>
        </div>
        <img className="featured-project__img" src={`/img/${project.img}`} />
      </div>
    );
  };

  render() {
    return (
      <section className="featured-project section">
        <SectionHeader>{t('general.featuredProject')}</SectionHeader>
        {this.renderFeaturedProject()}
      </section>
    );
  }
}

FeaturedProjectComponent.propTypes = {
  featuredProject: PropTypes.shape({
    title: PropTypes.string,
    img: PropTypes.string,
    description: PropTypes.string,
    technologies: PropTypes.arrayOf(PropTypes.string),
  }),
};

export const FeaturedProject = connect(featuredProjectSelector)(
  FeaturedProjectComponent
);
