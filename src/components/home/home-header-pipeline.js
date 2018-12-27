import React from 'react';
import { connect } from 'react-redux';

import { pipelineUtils as p } from '../../utils/pipeline-utils';

export class HomeHeaderPipeline extends React.Component {
  componentDidMount() {
    setup();
    window.addEventListener('resize', resize);
  }

  render() {
    return <div />;
  }
}

HomeHeaderPipeline.propTypes = {};
export default connect(
  null,
  null
)(HomeHeaderPipeline);

const pipeCount = 8;
const maxPipeCount = 50;
const pipePropCount = 9;
const pipePropsLength = pipeCount * pipePropCount;
const turnCount = 8;
const turnAmount = (360 / turnCount) * p.TO_RAD;
const turnChanceRange = 58;
const baseSpeed = 0.5;
const rangeSpeed = 1;
const baseTTL = 100;
const rangeTTL = 300;
const baseWidth = 2;
const rangeWidth = 4;
const baseHue = 180;
const rangeHue = 60;
const backgroundColor = '#1e282e';

let container;
let headerLeft;
let canvas;
let ctx;
let center;
let tick;
let pipeProps;
let pipeIncrement;

function setup() {
  createCanvas();
  resize();
  initPipes();
  draw();
}

function initPipes() {
  pipeProps = new Float32Array(pipePropsLength);
  pipeIncrement = 0;

  let i;

  for (i = 0; i < pipePropsLength; i += pipePropCount) {
    initPipe(i);
  }
}

function initPipe(i) {
  const x = p.rand(canvas.a.width - headerLeft);
  const y = center[1] + p.rand(canvas.a.height / 2) - canvas.a.height / 4;
  const direction = p.round(p.rand(1)) ? p.HALF_PI : p.TAU - p.HALF_PI;
  const speed = baseSpeed + p.rand(rangeSpeed);
  const life = 0;
  const ttl = baseTTL + p.rand(rangeTTL);
  const width = baseWidth + p.rand(rangeWidth);
  const hue = baseHue + p.rand(rangeHue);
  const done = false;
  pipeIncrement++;

  pipeProps.set([x, y, direction, speed, life, ttl, width, hue, done], i);
}

function updatePipes() {
  tick++;

  let i;

  for (i = 0; i < pipePropsLength; i += pipePropCount) {
    updatePipe(i);
  }
}

function updatePipe(i) {
  const i2 = 1 + i;

  const i3 = 2 + i;

  const i4 = 3 + i;

  const i5 = 4 + i;

  const i6 = 5 + i;

  const i7 = 6 + i;

  const i8 = 7 + i;

  const i9 = 8 + i;
  let x;
  let y;
  let direction;
  let life;

  x = pipeProps[i];
  y = pipeProps[i2];
  direction = pipeProps[i3];
  const speed = pipeProps[i4];
  life = pipeProps[i5];
  const ttl = pipeProps[i6];
  const width = pipeProps[i7];
  const hue = pipeProps[i8];
  const done = pipeProps[i9];

  if (done) return;

  drawPipe(x, y, life, ttl, width, hue);

  life++;
  x += p.cos(direction) * speed;
  y += p.sin(direction) * speed;
  const turnChance = !(tick % p.round(p.rand(turnChanceRange))) && (!(p.round(x) % 6) || !(p.round(y) % 6));
  const turnBias = p.round(p.rand(1)) ? -1 : 1;
  direction += turnChance ? turnAmount * turnBias : 0;

  pipeProps[i] = x;
  pipeProps[i2] = y;
  pipeProps[i3] = direction;
  pipeProps[i5] = life;

  [x, y] = checkBounds(x, y);
  if (life > ttl) {
    if (pipeIncrement <= maxPipeCount) initPipe(i);
    else pipeProps[i9] = true;
  }
}

function drawPipe(x, y, life, ttl, width, hue) {
  ctx.a.save();
  ctx.a.strokeStyle = `hsla(${hue},100%,100%,${p.fadeInOut(life, ttl) * 0.125})`;
  ctx.a.beginPath();
  ctx.a.arc(x, y, width, 0, p.TAU);
  ctx.a.stroke();
  ctx.a.closePath();
  ctx.a.restore();
}

function checkBounds(x, y) {
  let newX = x;
  let newY = y;
  if (x > canvas.a.width) newX = 0;
  if (x < 0) newX = canvas.a.width;
  if (y > canvas.a.height) newY = 0;
  if (y < 0) newY = canvas.a.height;
  return [newX, newY];
}

function createCanvas() {
  container = document.querySelector('.home-header');
  headerLeft = document.querySelector('.home-header__name').getBoundingClientRect().left - 128;
  canvas = {
    a: document.createElement('canvas'),
    b: document.createElement('canvas'),
  };
  canvas.b.style = `
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
    height: 100%;
    z-index: -1;
	`;
  container.appendChild(canvas.b);
  ctx = {
    a: canvas.a.getContext('2d'),
    b: canvas.b.getContext('2d'),
  };
  center = [];
  tick = 0;
}

function resize() {
  const { innerWidth, innerHeight } = window;

  canvas.a.width = innerWidth;
  canvas.a.height = innerHeight;

  ctx.a.drawImage(canvas.b, 0, 0);

  canvas.b.width = innerWidth;
  canvas.b.height = innerHeight;

  ctx.b.drawImage(canvas.a, 0, 0);

  center[0] = 0.5 * canvas.a.width;
  center[1] = 0.5 * canvas.a.height;
}

function render() {
  ctx.b.save();
  ctx.b.fillStyle = backgroundColor;
  ctx.b.fillRect(0, 0, canvas.b.width, canvas.b.height);
  ctx.b.restore();

  ctx.b.save();
  ctx.b.filter = 'blur(12px)';
  ctx.b.drawImage(canvas.a, 0, 0);
  ctx.b.restore();

  ctx.b.save();
  ctx.b.drawImage(canvas.a, 0, 0);
  ctx.b.restore();
}

function draw() {
  updatePipes();

  render();

  window.requestAnimationFrame(draw);
}
