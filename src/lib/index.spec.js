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

        it('should add long break', () => {
          the.focus.play();
          expect(the.focus.current.type).toBe(LONG_TYPE);
        });
      });

      describe('when current is active', () => {
        the('items', () => [{ duration: 5 }]);

        it('should not add new items', () => {
          expect(the.focus.items.length).toBe(1);
          the.focus.play();
          expect(the.focus.items.length).toBe(1);
        });
      });
    });
  });

  describe('.start()', () => {
    it('should call "tick" every second', () => {
      const tick = () => {};

      spyOn(window, 'setInterval');
      spyOn(the.focus.tick, 'bind').and.returnValue(tick);

      the.focus.start();

      expect(window.setInterval).toHaveBeenCalledWith(tick, 1000);
    });
  });

  describe('.tick()', () => {
    it('should call "tick" on each item', () => {
      the('input', () => ({ items: [{}, {}] }));

      const first = the.focus.items[0];
      const second = the.focus.items[1];

      spyOn(first, 'tick');
      spyOn(second, 'tick');

      the.focus.tick();

      expect(first.tick).toHaveBeenCalled();
      expect(second.tick).toHaveBeenCalled();
    });
  });

  describe('.pause()', () => {
    it('should call pause on current item', () => {
      the('input', () => ({ items: [{}] }));
      spyOn(the.focus.current, 'pause');

      the.focus.pause();
      expect(the.focus.current.pause).toHaveBeenCalled();
    });
  });

  describe('.unpause()', () => {
    it('should call pause on current item', () => {
      the('input', () => ({ items: [{}] }));
      spyOn(the.focus.current, 'unpause');

      the.focus.unpause();
      expect(the.focus.current.unpause).toHaveBeenCalled();
    });
  });

  describe('.reset()', () => {
    describe('when current is active', () => {
      the('input', () => ({ items: [{}, { duration: 1 }] }));

      it('should remove last element', () => {
        expect(the.focus.items.length).toBe(2);
        the.focus.reset();
        expect(the.focus.items.length).toBe(1);
      });
    });

    describe('when current is not active', () => {
      the('input', () => ({ items: [{}] }));

      it('should not do anything', () => {
        expect(the.focus.items.length).toBe(1);
        the.focus.reset();
        expect(the.focus.items.length).toBe(1);
      });
    });
  });

  describe('.toJson()', () => {
    the('input', () => ({
      items: [
        { createdAt: 1, type: 'one', duration: 1, pauses: [] },
        { createdAt: 2, type: 'two', duration: 2, pauses: [] },
      ],
      target: 5,
      longAfter: 3,
      durations: {
        DEFAULT: 1,
        SHORT: 2,
        LONG: 3,
      },
    }));

    it('should return state as json', () => {
      expect(the.focus.toJson()).toEqual(the.input);
    });
  });

  describe('.isTimeToLong', () => {
    the('input', () => ({ longAfter: 4 }));
    the('length', () => 0);
    the('completed', () => ({ length: the.length }));

    beforeEach(() => {
      spyOnProperty(the.focus, 'completed', 'get').and.callFake(() => the.completed);
    });

    describe('when completed is equal', () => {
      the('length', () => 4);

      it('should return "true"', () => {
        expect(the.focus.isTimeToLong).toBe(true);
      });
    });

    describe('when completed is enough', () => {
      the('length', () => 12);

      it('should return "true"', () => {
        expect(the.focus.isTimeToLong).toBe(true);
      });
    });

    describe('when completed is not enough', () => {
      the('length', () => 3);

      it('should return "false"', () => {
        expect(the.focus.isTimeToLong).toBe(false);
      });
    });

    describe('when completed is not time', () => {
      the('length', () => 5);

      it('should return "false"', () => {
        expect(the.focus.isTimeToLong).toBe(false);
      });
    });
  });
});
