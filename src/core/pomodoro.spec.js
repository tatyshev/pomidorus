import Pomodoro, { DEFAULT_DURATION, EVENT_FINISH } from './pomodoro';

let pomodoro = null;

beforeEach(() => {
  pomodoro = new Pomodoro();
});

test('tick()', () => {
  expect(pomodoro.state).toBe(0);

  pomodoro.tick();

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

test('finish event', () => {
  let handler = jest.fn();

  pomodoro.on(EVENT_FINISH, handler);

  pomodoro.tick();

  expect(handler).not.toBeCalled();

  pomodoro.state = DEFAULT_DURATION;
  pomodoro.tick();

  expect(handler).toBeCalled();
})
