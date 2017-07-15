import { DEFAULT_INTERVAL, DEFAULT_DURATION } from './pomodoro';
import Focus from './index';

jest.useFakeTimers();

const tick = () => jest.runTimersToTime(DEFAULT_INTERVAL);
let focus = null;

beforeEach(() => {
  focus = new Focus();
});

describe('Focus.rotate()', () => {
  describe('when items is empty', () => {
    it('should push pomodoro', () => {
      focus.rotate();
      expect(focus.isPomodoro).toBeTruthy();
    });
  });

  describe('when latest is pomodoro and is finished', () => {
    it('should call rotate() and push pending', () => {
      focus.rotate();

      focus.latest.state = DEFAULT_DURATION;
      jest.spyOn(focus, 'rotate');

      tick();

      expect(focus.rotate).toBeCalled();

      tick();

      expect(focus.isPending).toBeTruthy();
    });
  });

  describe('when latest is pomodoro and is not finished', () => {
    it('should not do anything', () => {
      focus.rotate();
      focus.rotate();

      expect(focus.stack.length).toBe(1);
    });
  });

  describe('when latest is pending and switchTo is "break"', () => {
    it('should push break into stack and switch to "default"', () => {
      focus.rotate();
      focus.latest.state = DEFAULT_DURATION;
      tick();
      tick();

      expect(focus.isPending).toBeTruthy();
      expect(focus.switchTo).toBe('break');

      const pending = focus.latest;
      jest.spyOn(pending, 'stop');

      focus.rotate();

      expect(pending.stop).toBeCalled();
      expect(focus.isPomodoro).toBeTruthy();
      expect(focus.latest.type).toBe('break');
      expect(focus.switchTo).toBe('default');
    });
  });
});

describe('Focus.[un]pause()', () => {
  it('should pause pomodoro', () => {
    focus.rotate();
    focus.pause();

    expect(focus.latest.paused).toBeTruthy();

    focus.unpause();

    expect(focus.latest.paused).toBeFalsy();
  });
});
