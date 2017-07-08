import Pomodoro, { DEFAULT_TYPE } from './pomodoro';
import Pending from './pending';

export const DEFAULT_GOAL = 25;
export const BREAK_TYPE = 'break';

export default class Focus {
  constructor (options = {}) {
    this.goal = options.goal || DEFAULT_GOAL;
    this.started = false;
    this.items = [];
  }

  start () {
    if (this.started) { return }

    this.started = true;
    this.push();
  }

  push (item) {
    this.items.push(item);
  }

  rotate () {
    if (this.isEmpty) {
      let work = new Pomodoro();
      this.push(work);
      work.start();
    }

    /*
    if (this.isWork) {
      let pomodoro = this.latest;

      if (pomodoro.isFinished) {
      }
    }
    */
  }

  get latest () {
    let items = this.items;
    return items[items.length - 1];
  }

  get isEmpty () {
    return this.items.length === 0;
  }

  get isPomodoro () {
    return this.latest instanceof Pomodoro;
  }

  get isPending () {
    return this.latest instanceof Pending;
  }

  get isWork () {
    if (this.isPomodoro) {
      return this.latest && this.latest.type == DEFAULT_TYPE;
    }

    return false;
  }

  get isBreak () {
    if (this.isPomodoro) {
      return this.latest && this.latest.type == BREAK_TYPE;
    }

    return false;
  }
}
