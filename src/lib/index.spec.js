import Focus, { DEFAULT_TYPE, SHORT_TYPE, LONG_TYPE } from './index';
import Pomodoro from './pomodoro';

the('input', () => ({}));
the('focus', () => new Focus(the.input));

describe('Focus', () => {
  describe('.constructor()', () => {
    it('should set default initial state', () => {
      expect(the.focus.state).toEqual(Focus.state);
    });

    it('should set initial state', () => {
      const custom = {
        items: [],
        target: 1,
        longAfter: 2,
        durations: { DEFAULT: 3, SHORT: 4, LONG: 5 },
      };

      the('input', () => custom);
      expect(the.focus.state).toEqual(custom);
    });

    it('should wrap all items with Pomodoro', () => {
      the('input', () => ({ items: [{}, {}] }));
      const isPomodoro = item => item instanceof Pomodoro;
      expect(the.focus.items.map(isPomodoro)).toEqual([true, true]);
    });
  });

  describe('.play()', () => {
    describe('when items is empty', () => {
      it('should add first pomodoro', () => {
        expect(the.focus.items.length).toBe(0);
        the.focus.play();
        expect(the.focus.items.length).toBe(1);
      });
    });

    describe('when items is not empty', () => {
      the('input', () => ({ items: the.items }));

      describe('when current is work', () => {
        the('items', () => [{ type: DEFAULT_TYPE }]);

        it('should add "work" pomodoro', () => {
          const items = the.focus.items;
          the.focus.play();

          expect(items.length).toBe(2);
          expect(the.focus.current.type).toBe(SHORT_TYPE);
        });
      });

      describe('when current is break', () => {
        the('items', () => [
          { type: DEFAULT_TYPE },
          { type: SHORT_TYPE },
        ]);

        it('should add "break" pomodoro', () => {
          const items = the.focus.items;
          the.focus.play();

          expect(items.length).toBe(3);
          expect(items[items.length - 1].type).toBe(DEFAULT_TYPE);
        });
      });

      describe('when time to long break', () => {
        the('input', () => ({
          longAfter: 2,
          items: [
            { type: DEFAULT_TYPE, duration: 0 },
            { type: SHORT_TYPE, duration: 0 },
            { type: DEFAULT_TYPE, duration: 0 },
          ],
        }));

        it('should long break', () => {
          the.focus.play();
          expect(the.focus.current.type).toBe(LONG_TYPE);
        });
      });
    });
  });
});
