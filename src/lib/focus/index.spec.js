import { DEFAULT_INTERVAL, DEFAULT_DURATION } from './pomodoro';
import Focus from './index';

const tick = () => jasmine.clock().tick(DEFAULT_INTERVAL);
let focus = null;

beforeEach(() => {
  jasmine.clock().uninstall();
  jasmine.clock().install();

  focus = new Focus();
});

afterEach(() => {
  jasmine.clock().uninstall();
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
      spyOn(focus, 'rotate').and.callThrough();

      tick();

      expect(focus.rotate).toHaveBeenCalled();

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
      spyOn(pending, 'stop').and.callThrough();

      focus.rotate();

      expect(pending.stop).toHaveBeenCalled();
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
