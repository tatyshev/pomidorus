export const DEFAULT_INTERVAL = 1000;

export default class Pending {
  constructor (options = {}) {
    this.timeout = options.interval || DEFAULT_INTERVAL;

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
