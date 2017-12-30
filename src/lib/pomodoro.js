import merge from 'deepmerge';

export default class Pomodoro {
  static get state() {
    const createdAt = Date.now();

    return {
      createdAt,
      duration: 0,
      skipped: false,
      type: null,
      pauses: [],
    };
  }

  constructor(state = {}) {
    this.state = merge(Pomodoro.state, state);
    this.time = Date.now();
    this.tick();
  }

  tick() {
    if (!this.finished) {
      this.time = Date.now();
    }
  }

  pause() {
    const { pauses } = this.state;
    const last = pauses[pauses.length - 1];

    if (last === undefined || last.end !== null) {
      pauses.push({
        start: this.time,
        end: null,
      });
    }
  }

  unpause() {
    const { pauses } = this.state;
    const last = pauses[pauses.length - 1];

    if (last !== undefined && last.end === null) {
      const end = this.time;

      if (last.start === end) {
        pauses.pop();
      } else {
        last.end = end;
      }
    }
  }

  get pauses() {
    return this.state.pauses.reduce((result, pause) => {
      const start = new Date(pause.start);
      const end = pause.end !== null ? pause.end : this.time;
      return result + (end - start);
    }, 0);
  }

  get paused() {
    const { pauses } = this.state;
    const last = pauses[pauses.length - 1];
    return last !== undefined && last.end === null;
  }

  get createdAt() {
    return this.state.createdAt;
  }

  get type() {
    return this.state.type;
  }

  get duration() {
    return this.state.duration;
  }

  get skipped() {
    return this.state.skipped;
  }

  get interval() {
    if (this.skipped) return this.duration + 1;
    return this.time - (this.createdAt + this.pauses);
  }

  get elapsed() {
    const value = this.duration - this.interval;
    return value > 0 ? value : 0;
  }

  get finished() {
    return this.skipped || this.elapsed <= 0;
  }
}
