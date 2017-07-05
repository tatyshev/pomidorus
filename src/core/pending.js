export const DEFAULT_TIMEOUT = 1000;

export default class Pending {
  constructor (options = {}) {
    this.timeout = options.timeout || DEFAULT_TIMEOUT;

    this.state = 0;
    this.tick = this.tick.bind(this);
    this.timer = null;
  }

  start () {
    this.timer = setInterval(this.tick, this.timeout);
  }

  stop () {
    clearInterval(this.timer);
  }

  tick () {
    this.state++;
  }
}
