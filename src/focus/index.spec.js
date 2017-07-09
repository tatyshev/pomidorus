import Pomodoro, { DEFAULT_INTERVAL } from './pomodoro';
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
});
