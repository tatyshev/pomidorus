import Pomodoro, { DEFAULT_TYPE, EVENT_FINISH } from './pomodoro';
import Pending from './pending';

export const DEFAULT_GOAL = 25;
export const BREAK_TYPE = 'break';

export default class Focus {
  constructor (options = {}) {
    this.goal = options.goal || DEFAULT_GOAL;
    this.items = [];
    this.pomodoro = null;
  }

  push (item) {
    if (item instanceof Pomodoro) {
      this.pomodoro = item;
    }

    this.items.push(item);
  }

  rotate () {
    // console.log('this.isEmpty => ', this.isEmpty);
    // console.log('this.isFinishedPomodoro => ', this.isFinishedPomodoro);

    if (this.isEmpty) {
      let work = new Pomodoro();

      work.on(EVENT_FINISH, () => this.rotate());
      work.start();

      this.push(work);

      return;
    }

    if (this.isFinishedPomodoro) {
      let pending = new Pending();

      pending.start();

      return;
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

  get isFinishedPomodoro () {
    if (this.isPomodoro) {
      return this.latest.isFinished;
    }

    return false;
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
