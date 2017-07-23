import Pomodoro, {
  DEFAULT_INTERVAL,
  DEFAULT_DURATION,
} from './pomodoro';

const tick = () => jasmine.clock().tick(DEFAULT_INTERVAL);
let pomodoro = null;

beforeEach(() => {
  jasmine.clock().uninstall();
  jasmine.clock().install();

  pomodoro = new Pomodoro();
  pomodoro.start();
});

afterEach(() => {
  jasmine.clock().uninstall();
});

describe('Pomodoro.tick()', () => {
  it('should just increment state on every tick', () => {
    expect(pomodoro.state).toBe(0);

    tick();

    expect(pomodoro.state).toBe(1);
  });

  it('should not increment when state >= duration', () => {
    pomodoro.state = DEFAULT_DURATION;

    tick();
    tick();

    expect(pomodoro.state).toBe(DEFAULT_DURATION);
  });
});

describe('Pomodoro.isFinished()', () => {
  it('should not return false when pomodoro is not finished', () => {
    expect(pomodoro.isFinished).toBeFalsy();
  });

  it('should return false when pomodoro is not finished', () => {
    pomodoro.state = DEFAULT_DURATION;
    expect(pomodoro.isFinished).toBeTruthy();
  });
});

describe('Pomodoro.pause()', () => {
  describe('when paused', () => {
    it('should add and increase pause counters', () => {
      pomodoro.pause();
      tick();
      expect(pomodoro.pauses).toEqual({ 0: 1 });
    });
  });

  describe('when paused multiple times', () => {
    it('should add multiple items into pauses', () => {
      pomodoro.pause();

      tick();

      expect(pomodoro.pauses).toEqual({ 0: 1 });

      pomodoro.unpause();
      tick();

      pomodoro.pause();
      tick();

      expect(pomodoro.pauses).toEqual({ 0: 1, 1: 1 });
    });
  });

  describe('when unpaused', () => {
    it('should not increase or add pause counters', () => {
      tick();
      expect(pomodoro.pauses).toEqual({});
    });
  });
});

describe('Pomodoro.clock', () => {
  it('should render state as human readable clock', () => {
    pomodoro.state = 1389;
    expect(pomodoro.clock).toBe('23:09');

    pomodoro.state = 1400;
    expect(pomodoro.clock).toBe('23:20');

    pomodoro.state = DEFAULT_DURATION;
    expect(pomodoro.clock).toBe('25:00');

    pomodoro.state = 0;
    expect(pomodoro.clock).toBe('00:00');
  });
});
