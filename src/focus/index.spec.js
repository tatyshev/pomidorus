import Pomodoro, { DEFAULT_INTERVAL, DEFAULT_DURATION } from './pomodoro';
import Focus from './index';

jest.useFakeTimers();

const tick = () => jest.runTimersToTime(DEFAULT_INTERVAL);
let focus = null;

beforeEach(() => {
  focus = new Focus();
});

describe('Focus.rotate()', () => {
  describe('when items are empty', () => {
    it('should push pomodoro to item', () => {
      focus.rotate();
      expect(focus.latest).toBeInstanceOf(Pomodoro);
    });
  });

  describe('when pomodoro are finished', () => {
    it('should call rotate() when pomodoro are finished', () => {
      focus.rotate();
      const latest = focus.latest;

      latest.state = DEFAULT_DURATION;
      focus.rotate = jest.fn();

      tick();

      expect(focus.rotate).toBeCalled();
    });
  });

  describe('when pomodoro are not finished', () => {
    it('should not do anything', () => {
      focus.rotate();
      focus.rotate();

      expect(focus.items.length).toBe(1);
      expect(focus.activity).toBe(focus.latest);
    });
  });
});

describe('Focus.pause(), Focus.pause()', () => {
  it('should pause pomodoro', () => {
    focus.rotate();
    focus.pause();

    expect(focus.latest.paused).toBeTruthy();

    focus.unpause();

    expect(focus.latest.paused).toBeFalsy();
  });
});
