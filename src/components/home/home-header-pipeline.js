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
        minX: 0,
        maxX: 0,
        minY: 0,
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
        resolve
      );
    });
  }

  generatePipes() {
    return new Promise(resolve => {
      const pipes = [];

      for (let i = 0; i < this.state.pipeCount; i++) {
        pipes.push(this.generatePipe(i));
      }

      this.setState({ pipes }, resolve);
    });
  }

  generatePipe(i) {
    const config = this.state.config;
    const turns = [];
    const turnCount = p.randIn(0, config.maxTurns);
    const fullLength = p.randIn(config.minLength, config.maxLength);

    for (let turn = 0; turn < turnCount; turn++) {
      turns.push([p.randIn(0, fullLength), p.round(p.rand(1)) ? -1 : 1]);
    }

    const pipe = {
      pipeId: i,
      fullLength,
      pipeRadius: p.randIn(config.minRadius, config.maxRadius),
      speed: p.randIn(config.minSpeed, config.maxSpeed),
      lifetime: p.randIn(config.minLifetime, config.maxLifeTime),
      startPos: [p.randIn(config.minX, config.maxX), p.randIn(config.minY, config.maxY)],
      startDirection: p.randIn(0, 8) * (p.PI / 4),
      turns,
    };

    return pipe;
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
