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
});
