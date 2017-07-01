import Pomodoro, { DEFAULT_DURATION } from './pomodoro';

let pomodoro = null;

beforeEach(() => {
  pomodoro = new Pomodoro();
});

test('tick()', () => {
  expect(pomodoro.duration).toBe(DEFAULT_DURATION);

  pomodoro.tick();

  expect(pomodoro.duration).toBe(DEFAULT_DURATION - 1);

  pomodoro.duration = 0;
  pomodoro.tick();

  expect(pomodoro.duration).toBe(0);
});

test('isFinished()', () => {
  expect(pomodoro.isFinished()).toBeFalsy();
  pomodoro.duration = 0;
  expect(pomodoro.isFinished()).toBeTruthy();
});
