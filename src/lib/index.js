import merge from 'deepmerge';
import Pomodoro from './pomodoro';

export const DEFAULT_TYPE = 'DEFAULT';
export const SHORT_TYPE = 'SHORT';
export const LONG_TYPE = 'LONG';

export default class Focus {
  static get state() {
    return {
      items: [],
      target: 10,
      longAfter: 4,
      durations: {
        [DEFAULT_TYPE]: 25 * 60 * 1000,
        [SHORT_TYPE]: 5 * 60 * 1000,
        [LONG_TYPE]: 15 * 60 * 1000,
      },
    };
  }

  constructor(state = {}) {
    this.state = merge(Focus.state, state);

    if (!this.isEmpty) {
      this.state.items = this.items.map(item => new Pomodoro(item));
    }
  }

  start() {
    setInterval(this.tick.bind(this), 1000);
  }

  tick() {
    this.items.forEach(item => item.tick());
  }

  play() {
    if (this.isActive) {
      return;
    }

    let type;
    let duration;

    if (this.isBreak || this.isEmpty) {
      type = DEFAULT_TYPE;
      duration = this.durations[DEFAULT_TYPE];
    }

    if (this.isWork) {
      type = this.isTimeToLong ? LONG_TYPE : SHORT_TYPE;
      duration = this.durations[type];
    }

    this.items.push(new Pomodoro({ type, duration }));
  }

  pause() {
    if (this.current) {
      this.current.pause();
    }
  }

  unpause() {
    if (this.current) {
      this.current.unpause();
    }
  }

  reset() {
    if (this.isActive) {
      this.items.pop();
    }
  }

  toJson() {
    const state = { ...this.state };

    if (state.items.length !== 0) {
      state.items = state.items.map(item => ({ ...item.state }));
    }

    return state;
  }

  get items() {
    return this.state.items;
  }

  get completed() {
    return this.items.filter(item => item.type === DEFAULT_TYPE && item.finished);
  }

  get durations() {
    return this.state.durations;
  }

  get longAfter() {
    return this.state.longAfter;
  }

  get isTimeToLong() {
    return (this.completed.length % this.longAfter) === 0;
  }

  get elapsed() {
    if (!this.current) {
      return 0;
    }

    return this.current.elapsed;
  }

  get current() {
    return this.items[this.items.length - 1];
  }

  get isWork() {
    return this.current && this.current.type === DEFAULT_TYPE;
  }

  get isBreak() {
    return this.current && this.current.type === SHORT_TYPE;
  }

  get isLong() {
    return this.current && this.current.type === LONG_TYPE;
  }

  get isEmpty() {
    return this.items.length === 0;
  }

  get isActive() {
    return this.current && !this.current.finished;
  }

  get isPaused() {
    return this.current !== undefined && this.current.paused;
  }
}
