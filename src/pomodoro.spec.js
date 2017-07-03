import Pomodoro, { DEFAULT_DURATION } from './pomodoro';

jest.useFakeTimers();

let pomodoro = null;

beforeEach(() => {
  pomodoro = new Pomodoro();
});

test('tick()', () => {
  pomodoro.tick();

  expect(pomodoro.pending).toBe(1);
  expect(pomodoro.state).toBe(0);

  pomodoro.start();
  pomodoro.tick();

  expect(pomodoro.pending).toBe(1);
  expect(pomodoro.state).toBe(1);

  pomodoro.state = DEFAULT_DURATION;
  pomodoro.tick();

  expect(pomodoro.state).toBe(DEFAULT_DURATION);
});

test('isFinished()', () => {
  expect(pomodoro.isFinished()).toBeFalsy();
  pomodoro.state = DEFAULT_DURATION;
  expect(pomodoro.isFinished()).toBeTruthy();
});

test('pause(), unpause()', () => {
  pomodoro.start();
  pomodoro.pause();
  pomodoro.tick();

  expect(pomodoro.pauses).toEqual({ 0: 1 });

  pomodoro.unpause();
  pomodoro.tick();

  expect(pomodoro.pauses).toEqual({ 0: 1 });

  pomodoro.pause();
  pomodoro.tick();

  expect(pomodoro.pauses).toEqual({ 0: 1, 1: 1 });
});
