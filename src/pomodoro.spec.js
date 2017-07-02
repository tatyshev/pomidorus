import Pomodoro, { DEFAULT_DURATION } from './pomodoro';

let pomodoro = null;

beforeEach(() => {
  pomodoro = new Pomodoro();
});

test('tick()', () => {
  expect(pomodoro.current).toBe(0);

  pomodoro.tick();

  expect(pomodoro.current).toBe(1);

  pomodoro.current = DEFAULT_DURATION;
  pomodoro.tick();

  expect(pomodoro.current).toBe(DEFAULT_DURATION);
});

test('isFinished()', () => {
  expect(pomodoro.isFinished()).toBeFalsy();
  pomodoro.current = DEFAULT_DURATION;
  expect(pomodoro.isFinished()).toBeTruthy();
});
