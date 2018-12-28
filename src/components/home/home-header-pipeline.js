import React from 'react';
import { connect } from 'react-redux';

import { pipelineUtils as p } from '../../utils/pipeline-utils';

export class HomeHeaderPipeline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      config: {
        pipeCount: 8,
        minLength: 100,
        maxLength: 400,
        minRadius: 2,
        maxRadius: 6,
        minSpeed: 1,
        maxSpeed: 1,
        minLifetime: 0,
        maxLifeTime: 0,
        maxX: 0,
        maxY: 0,
        maxTurns: 5,
      },
      pipes: [],
      tick: 0,
    };

    this.canvas = React.createRef();
  }

  componentDidMount() {
    this.setup()
      .then(() => {
        this.generatePipes();
      })
      .then(() => {
        this.draw();
      })
      .catch(() => {});
  }

  setup() {
    return new Promise(resolve => {
      const headerLeft = document.querySelector('.home-header__name').getBoundingClientRect().left - 128;
      this.setState(
        prevState => ({
          config: {
            ...prevState.config,
            maxX: headerLeft,
            maxY: this.canvas.current.getBoundingClientRect().height,
          },
        }),
        () => {
          resolve();
        }
      );
    });
  }

  generatePipes() {
    return Promise.resolve();
  }

  draw() {
    const ctx = this.canvas.current.getContext('2d');
    ctx.save();
    ctx.fillStyle = '#1e282e';
    ctx.fillRect(
      0,
      0,
      this.canvas.current.getBoundingClientRect().width,
      this.canvas.current.getBoundingClientRect().height
    );
    ctx.restore();
    return p.TAU;
  }

  render() {
    return <canvas ref={this.canvas} className="pipeline__canvas" />;
  }
}

HomeHeaderPipeline.propTypes = {};
export default connect(
  null,
  null
)(HomeHeaderPipeline);
