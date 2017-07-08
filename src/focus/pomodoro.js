import Emitter from 'component-emitter';

export const DEFAULT_TYPE = 'default';
export const DEFAULT_DURATION = 25 * 60;
export const DEFAULT_TIMEOUT = 1000;
export const EVENT_FINISH = 'finish';

export default class Pomodoro {
  constructor (options = {}) {
    this.type = options.type || DEFAULT_TYPE;
    this.duration = options.duration || DEFAULT_DURATION;
    this.timeout = options.timeout || DEFAULT_TIMEOUT;

    this.state = 0;
    this.started = false;
    this.paused = false;
    this.pauses = {};
    this.timer = null;

    Emitter(this);
  }

  start () {
    if (this.started) { return }

    this.started = true;

    let tick = this.tick.bind(this);
    this.timer = setTimeout(tick, this.timeout);
  }

  stop () {
    clearTimeout(this.timer);
  }

  pause () {
    this.paused = true;
  }

  unpause () {
    this.paused = false;
  }

  tick () {
    if (this.paused) {
      let pauses = this.pauses;
      let current = this.state;

      pauses[current] = pauses[current] || 0;
      pauses[current]++;

      return;
    }

    if (this.isFinished) {
      this.stop();
      this.emit(EVENT_FINISH);
      return;
    }

    if (this.state >= this.duration) {
      this.state = this.duration;
    } else {
      this.state++;
    }
  }

  get isFinished () {
    return this.state >= this.duration;
  }
}
