import React from 'react';
import PropTypes from 'prop-types';

export class SectionHeader extends React.Component {
  render() {
    return (
      <div className="section-header">
        <h2>{this.props.children}</h2>
      </div>
    );
  }
}

SectionHeader.propTypes = {
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
};
