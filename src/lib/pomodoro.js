import merge from 'deepmerge';

export default class Pomodoro {
  static get state() {
    const createdAt = new Date();

    return {
      createdAt: createdAt.toISOString(),
      duration: 0,
      type: null,
      pauses: [],
    };
  }

  constructor(state = {}) {
    this.state = merge(Pomodoro.state, state);
    this.date = new Date();
    this.tick();
  }

  tick() {
    if (!this.finished) {
      this.date = new Date();
    }
  }

  pause() {
    const pauses = this.state.pauses;
    const last = pauses[pauses.length - 1];

    if (last === undefined || last.end !== null) {
      pauses.push({
        start: this.now.toISOString(),
        end: null,
      });
    }
  }

  unpause() {
    const pauses = this.state.pauses;
    const last = pauses[pauses.length - 1];

    if (last !== undefined && last.end === null) {
      const end = this.now.toISOString();

      if (last.start === end) {
        pauses.pop();
      } else {
        last.end = end;
      }
    }
  }

  get now() {
    return new Date(this.date);
  }

  get pauses() {
    return this.state.pauses.reduce((result, pause) => {
      const start = new Date(pause.start);
      const end = pause.end !== null ? new Date(pause.end) : this.now;
      return result + (end.getTime() - start.getTime());
    }, 0);
  }

  get paused() {
    const pauses = this.state.pauses;
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

  get interval() {
    const now = this.now;
    const createdAt = new Date(this.createdAt);
    const result = now.getTime() - createdAt.getTime();
    return isNaN(result) ? 0 : result;
  }

  get elapsed() {
    const value = this.duration - this.interval - this.pauses;
    return value;
  }

  get finished() {
    return this.elapsed <= 0;
  }
}
