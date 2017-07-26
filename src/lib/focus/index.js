import Pomodoro, { DEFAULT_TYPE } from './pomodoro';

export const DEFAULT_GOAL = 25;
export const BREAK_TYPE = 'break';
export const BREAK_DURATION = 5 * 60;

export default class Focus {
  constructor(options = {}) {
    this.goal = options.goal || DEFAULT_GOAL;
    this.progress = 0;
    this.stack = [];
  }

  rotate() {
    if (this.latest && !this.latest.isFinished) {
      return;
    }

    if (this.isWork) {
      this.progress += 1;
    }

    let pomodoro = null;

    if (this.isEmpty || this.isBreak) {
      pomodoro = new Pomodoro();
    } else if (this.isWork) {
      pomodoro = new Pomodoro({ type: BREAK_TYPE, duration: BREAK_DURATION });
    }

    pomodoro.start();
    this.stack.push(pomodoro);
  }

  pause() {
    if (this.latest) { this.latest.pause(); }
  }

  unpause() {
    if (this.latest) { this.latest.unpause(); }
  }

  get latest() {
    const stack = this.stack;
    return stack[stack.length - 1];
  }

  get isWork() {
    return this.latest && this.latest.type === DEFAULT_TYPE;
  }

  get isBreak() {
    return this.latest && this.latest.type === BREAK_TYPE;
  }

  get isEmpty() {
    return this.stack.length === 0;
  }
}
