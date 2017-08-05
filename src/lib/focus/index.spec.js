import { DEFAULT_DURATION } from './pomodoro';
import Focus from './index';

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
      expect(focus.stack.length).toBe(0);
      focus.rotate();
      expect(focus.isWork).toBeTruthy();
    });
  });

  describe('when latest is work and is finished', () => {
    it('should push break', () => {
      focus.rotate();

      focus.latest.state = DEFAULT_DURATION;

      expect(focus.progress).toBe(0);

      focus.rotate();

      expect(focus.progress).toBe(1);
      expect(focus.isBreak).toBeTruthy();
    });
  });

  describe('when latest is break and is finished', () => {
    it('should push work', () => {
      focus.rotate();
      focus.latest.type = 'break';
      focus.latest.state = DEFAULT_DURATION;
      focus.rotate();

      expect(focus.isWork).toBeTruthy();
    });
  });

  describe('when latest is pomodoro and is not finished', () => {
    it('should not do anything', () => {
      focus.rotate();
      focus.rotate();

      expect(focus.stack.length).toBe(1);
    });
  });
});

describe('Focus.[un]pause()', () => {
  it('should pause pomodoro', () => {
    focus.rotate();
    focus.pause();

    expect(focus.isPaused).toBeTruthy();

    focus.unpause();

    expect(focus.isPaused).toBeFalsy();
  });
});
