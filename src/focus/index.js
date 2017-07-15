import Pomodoro, { DEFAULT_TYPE, EVENT_FINISH } from './pomodoro';
import Pending from './pending';

export const DEFAULT_GOAL = 25;
export const BREAK_TYPE = 'break';
export const BREAK_DURATION = 5 * 60;

export default class Focus {
  constructor(options = {}) {
    this.goal = options.goal || DEFAULT_GOAL;
    this.stack = [];
    this.switchTo = DEFAULT_TYPE;
  }

  rotate() {
    if (this.isEmpty || this.isPending) {
      let pomodoro = null;

      if (this.isPending) {
        this.latest.stop();
      }

      if (this.switchTo === DEFAULT_TYPE) {
        pomodoro = new Pomodoro();
        this.switchTo = BREAK_TYPE;
      } else {
        pomodoro = new Pomodoro({ type: BREAK_TYPE, duration: BREAK_DURATION });
        this.switchTo = DEFAULT_TYPE;
      }

      pomodoro.on(EVENT_FINISH, () => this.rotate());
      pomodoro.start();

      this.stack.push(pomodoro);

      return;
    }

    if (this.isPomodoro && this.latest.isFinished) {
      const pending = new Pending();
      pending.start();
      this.stack.push(pending);
    }
  }

  pause() {
    if (this.isPomodoro) { this.latest.pause(); }
  }

  unpause() {
    if (this.isPomodoro) { this.latest.unpause(); }
  }

  get latest() {
    const stack = this.stack;
    return stack[stack.length - 1];
  }

  get isEmpty() {
    return this.stack.length === 0;
  }

  get isPomodoro() {
    return this.latest instanceof Pomodoro;
  }

  get isPending() {
    return this.latest instanceof Pending;
  }
}
