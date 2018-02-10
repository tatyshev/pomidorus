import merge from 'deepmerge';
import Events from 'events';
import { minutes, today, propsLimit } from '@/lib/utils';
import Pomodoro from '@/lib/pomodoro';
import notify, { sounds } from '@/lib/notify';

export const DEFAULT_TYPE = 'DEFAULT';
export const SHORT_TYPE = 'SHORT';
export const LONG_TYPE = 'LONG';

export const DEFAULT_ALERT = 'It\'s time to work';
export const SHORT_ALERT = 'It\'s time to break';
export const LONG_ALERT = 'It\'s time to long break';

export const STATS_LIMIT = 100;

export default class Focus {
  static get state() {
    return {
      items: [],
      options: {
        theme: '',
        sounds: false,
        auto: false,
        notifications: false,
        target: 10,
        longAfter: 4,
        durations: {
          [DEFAULT_TYPE]: minutes(25),
          [SHORT_TYPE]: minutes(5),
          [LONG_TYPE]: minutes(15),
        },
      },
    };
  }

  static load() {
    const state = JSON.parse(localStorage.getItem('state')) || {};
    return new this(state);
  }

  constructor(state = {}) {
    const events = new Events();

    this.state = merge(Focus.state, state);
    this.pending = null;
    this.touched = false;

    this.on = events.on;
    this.emit = events.emit;

    if (!this.isEmpty) {
      this.state.items = this.items.map(item => new Pomodoro(item));
    }
  }

  start() {
    setInterval(this.tick.bind(this), 1000);
    this.touched = this.isActive;
  }

  tick() {
    this.items.forEach(item => item.tick());

    if (this.isActive) {
      this.emit('tick');
      return;
    }

    if (this.isFinished && this.touched && this.pending == null) {
      if (!this.current.skipped) {
        this.emit('finish', this.current);
        this.notify();
      }

      this.pending = this.current;
      if (this.options.auto) this.play();
    }
  }

  play() {
    if (this.isActive === true) return;

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

    this.touched = true;
    this.pending = null;

    const item = new Pomodoro({ type, duration });

    this.state.items = [...this.state.items, item];
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

  stop() {
    if (this.isActive) {
      this.items.pop();
    }
  }

  reset() {
    this.state.items = [];
  }

  skip() {
    if (this.isActive) {
      this.current.state.skipped = true;
    }
  }

  toJson() {
    const state = { ...this.state };

    if (state.items.length !== 0) {
      state.items = state.items.map(item => ({ ...item.state }));
    }

    return state;
  }

  statistics() {
    return {
      completed: this.completed.length,
      target: this.target,
      time: this.time,
    };
  }

  save() {
    const t = today();
    const state = this.toJson();
    let statistics = JSON.parse(localStorage.getItem('statistics'));

    if (statistics && !statistics[t]) {
      this.emit('daily');
      this.reset();
      this.play();
    } else {
      statistics = { ...statistics };
    }

    statistics[t] = propsLimit(this.statistics(), STATS_LIMIT);

    localStorage.setItem('state', JSON.stringify(state));
    localStorage.setItem('statistics', JSON.stringify(statistics));

    this.emit('update');
  }

  notify() {
    const { type } = this.current;
    const icon = 'android-chrome-192x192.png';
    let title = DEFAULT_ALERT;
    let vibrate = 200;

    if (type === DEFAULT_TYPE) {
      title = this.isTimeToLong ? LONG_ALERT : SHORT_ALERT;
      vibrate = 700;
    }

    if (this.options.sounds) sounds.play();

    if (this.options.notifications) {
      // eslint-disable-next-line consistent-return
      notify(title, { icon, vibrate });
    }
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

  get time() {
    return this.completed.reduce((time, p) => time + p.duration, 0);
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

  get isFinished() {
    return this.current && this.current.finished;
  }

  get isPaused() {
    return this.current !== undefined && this.current.paused;
  }
}
