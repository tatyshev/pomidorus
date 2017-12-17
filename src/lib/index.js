import merge from 'deepmerge';
import Events from 'events';
import { minutes } from '@/lib/utils';
import Pomodoro from './pomodoro';

export const DEFAULT_TYPE = 'DEFAULT';
export const SHORT_TYPE = 'SHORT';
export const LONG_TYPE = 'LONG';

export default class Focus {
  static get state() {
    return {
      items: [],
      options: {
        target: 10,
        longAfter: 4,
        durations: {
          [DEFAULT_TYPE]: minutes(5),
          [SHORT_TYPE]: minutes(2),
          [LONG_TYPE]: minutes(5),
        },
      },
    };
  }

  constructor(state = {}) {
    const events = new Events();

    this.state = merge(Focus.state, state);
    this.on = events.on;
    this.emit = events.emit;

    if (!this.isEmpty) {
      this.state.items = this.items.map(item => new Pomodoro(item));
    }
  }

  start() {
    setInterval(this.tick.bind(this), 1000);
  }

  tick() {
    this.items.forEach(item => item.tick());
    if (this.isActive) this.emit('tick');
  }

  play() {
    if (this.isActive) return;

    let type;
    let duration;

    if (this.isEmpty || this.isShort || this.isLong) {
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

  clear() {
    this.state.items = [];
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

  get options() {
    return this.state.options;
  }

  get target() {
    return this.options.target;
  }

  get completed() {
    return this.items.filter(item => item.type === DEFAULT_TYPE && item.finished);
  }

  get durations() {
    return this.options.durations;
  }

  get longAfter() {
    return this.options.longAfter;
  }

  get isTimeToLong() {
    return (this.completed.length % this.longAfter) === 0;
  }

  get elapsed() {
    if (!this.current) return 0;
    return this.current.elapsed;
  }

  get pauses() {
    if (!this.current) return 0;
    return this.current.pauses;
  }

  get interval() {
    if (!this.current) {
      return 0;
    }

    return this.current.interval;
  }

  get duration() {
    if (!this.current) return 0;
    return this.current.duration;
  }

  get current() {
    return this.items[this.items.length - 1];
  }

  get isWork() {
    return this.current && this.current.type === DEFAULT_TYPE;
  }

  get isShort() {
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
