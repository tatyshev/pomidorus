export const DEFAULT_TYPE = 'default';
export const DEFAULT_DURATION = 25 * 60;
export const DEFAULT_TIMEOUT = 1000;

export default class Pomodoro {
  constructor (options = {}) {
    this.type = options.type || DEFAULT_TYPE;
    this.duration = options.duration || DEFAULT_DURATION;
    this.timeout = options.timeout || DEFAULT_TIMEOUT;

    this.current = 0;
    this.started = true;
    this.timer = null;
  }

  start () {
    if (this.started) { return }

    let tick = this.tick.bind(this);
    this.timer = setTimeout(tick, this.timeout);
  }

  tick () {
    if (!this.isFinished()) {
      this.current++;
    }
  }

  isFinished () {
    return this.duration === this.current;
  }
}
