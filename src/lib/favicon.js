const SIZE = 16;

const DEFAULTS = {
  max: 100,
  value: 0,
};

const Canvas = (size) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const ratio = window.devicePixelRatio || 1;

  canvas.width = size * ratio;
  canvas.height = size * ratio;
  ctx.scale(ratio, ratio);

  return canvas;
};

const Icon = () => {
  const icon = document.createElement('link');

  icon.rel = 'icon';
  icon.type = 'image/png';

  return icon;
};

export default class Favicon {
  constructor(options = {}) {
    this.options = Object.assign({}, DEFAULTS, options);
    this.icon = Icon();
    this.size = SIZE;
    this.canvas = Canvas(this.size);
    this.ctx = this.canvas.getContext('2d');
  }

  attach() {
    const icons = document.querySelectorAll('link[rel=icon]');
    icons.forEach((icon) => { icon.setAttribute('rel', 'prev-icon'); });
    document.head.append(this.icon);
  }

  draw(options = {}) {
    const {
      max,
      value,
      fill,
    } = Object.assign({}, this.options, options);

    const {
      ctx, icon, canvas, size,
    } = this;

    ctx.clearRect(0, 0, size, size);

    this.drawPie({ fill: '#292f3d', padding: 0.5 });
    this.drawPie({ max, value, fill });

    icon.href = canvas.toDataURL();
  }

  drawPie(options) {
    const {
      max = 100,
      value = 100,
      width = 1,
      fill = 'transparent',
      padding = 1,
    } = options;

    const { ctx, size } = this;

    const center = size / 2;
    const progress = (360 / max) * value;
    const startAngle = (Math.PI / 180) * 270;
    const endAngle = (Math.PI / 180) * (270 + progress);

    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, center - padding, startAngle, endAngle, false);
    ctx.lineTo(center, center);
    ctx.strokeStyle = fill;
    ctx.fillStyle = fill;
    ctx.lineWidth = width;
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
}
