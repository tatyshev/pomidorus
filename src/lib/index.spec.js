import given from 'given2';
import Focus, { DEFAULT_TYPE, SHORT_TYPE, LONG_TYPE } from './index';
import Pomodoro from './pomodoro';

describe('Focus', () => {
  given('input', () => ({}));
  given('focus', () => new Focus(given.input));

  describe('.constructor()', () => {
    it('should set default initial state', () => {
      expect(given.focus.state).toEqual(Focus.state);
    });

    it('should set initial state', () => {
      const custom = {
        items: [],
        options: {
          theme: '',
          sounds: false,
          auto: false,
          notifications: false,
          target: 1,
          longAfter: 2,
          durations: { DEFAULT: 3, SHORT: 4, LONG: 5 },
        },
      };

      given('input', () => custom);
      expect(given.focus.state).toEqual(custom);
    });

    it('should wrap all items with Pomodoro', () => {
      given('input', () => ({ items: [{}, {}] }));
      const isPomodoro = item => item instanceof Pomodoro;
      expect(given.focus.items.map(isPomodoro)).toEqual([true, true]);
    });
  });

  describe('.play()', () => {
    describe('when items is empty', () => {
      it('should add first pomodoro', () => {
        expect(given.focus.items.length).toBe(0);
        given.focus.play();
        expect(given.focus.items.length).toBe(1);
      });
    });

    describe('when items is not empty', () => {
      given('input', () => ({ items: given.items }));

      describe('when current is work', () => {
        given('items', () => [{ type: DEFAULT_TYPE }]);

        it('should add "work" pomodoro', () => {
          given.focus.play();

          expect(given.focus.items.length).toBe(2);
          expect(given.focus.current.type).toBe(SHORT_TYPE);
        });
      });

      describe('when current is break', () => {
        given('items', () => [
          { type: DEFAULT_TYPE },
          { type: SHORT_TYPE },
        ]);

        it('should add "work" pomodoro', () => {
          given.focus.play();

          expect(given.focus.items.length).toBe(3);
          expect(given.focus.items[given.focus.items.length - 1].type).toBe(DEFAULT_TYPE);
        });
      });

      describe('when time to long break', () => {
        given('input', () => ({
          items: [
            { type: DEFAULT_TYPE, duration: 0 },
            { type: SHORT_TYPE, duration: 0 },
            { type: DEFAULT_TYPE, duration: 0 },
          ],
          options: {
            longAfter: 2,
          },
        }));

        it('should add long break', () => {
          given.focus.play();
          expect(given.focus.current.type).toBe(LONG_TYPE);
        });
      });

      describe('when current is active', () => {
        given('items', () => [{ duration: 5 }]);

        it('should not add new items', () => {
          expect(given.focus.items.length).toBe(1);
          given.focus.play();
          expect(given.focus.items.length).toBe(1);
        });
      });
    });
  });

  describe('.start()', () => {
    it('should call "tick" every second', () => {
      const tick = () => {};

      spyOn(window, 'setInterval');
      spyOn(given.focus.tick, 'bind').and.returnValue(tick);

      given.focus.start();

      expect(window.setInterval).toHaveBeenCalledWith(tick, 1000);
    });
  });

  describe('.tick()', () => {
    it('should call "tick" on each item', () => {
      given('input', () => ({ items: [{}, {}] }));

      const first = given.focus.items[0];
      const second = given.focus.items[1];

      spyOn(first, 'tick');
      spyOn(second, 'tick');

      given.focus.tick();

      expect(first.tick).toHaveBeenCalled();
      expect(second.tick).toHaveBeenCalled();
    });
  });

  describe('.pause()', () => {
    it('should call pause on current item', () => {
      given('input', () => ({ items: [{}] }));
      spyOn(given.focus.current, 'pause');

      given.focus.pause();
      expect(given.focus.current.pause).toHaveBeenCalled();
    });
  });

  describe('.unpause()', () => {
    it('should call pause on current item', () => {
      given('input', () => ({ items: [{}] }));
      spyOn(given.focus.current, 'unpause');

      given.focus.unpause();
      expect(given.focus.current.unpause).toHaveBeenCalled();
    });
  });

  describe('.stop()', () => {
    describe('when current is active', () => {
      given('input', () => ({ items: [{}, { duration: 1 }] }));

      it('should remove last element', () => {
        expect(given.focus.items.length).toBe(2);
        given.focus.stop();
        expect(given.focus.items.length).toBe(1);
      });
    });

    describe('when current is not active', () => {
      given('input', () => ({ items: [{}] }));

      it('should not do anything', () => {
        expect(given.focus.items.length).toBe(1);
        given.focus.stop();
        expect(given.focus.items.length).toBe(1);
      });
    });
  });

  describe('.toJson()', () => {
    given('input', () => ({
      items: [
        {
          createdAt: 1, type: 'one', duration: 1, pauses: [], skipped: false,
        },
        {
          createdAt: 2, type: 'two', duration: 2, pauses: [], skipped: false,
        },
      ],
      options: {
        theme: 'foo',
        sounds: false,
        auto: false,
        notifications: false,
        target: 5,
        longAfter: 3,
        durations: {
          DEFAULT: 1,
          SHORT: 2,
          LONG: 3,
        },
      },
    }));

    it('should return state as json', () => {
      expect(given.focus.toJson()).toEqual(given.input);
    });
  });

  describe('.isTimeToLong', () => {
    given('input', () => ({ longAfter: 4 }));
    given('len', () => 0);
    given('completed', () => ({ length: given.len }));

    beforeEach(() => {
      spyOnProperty(given.focus, 'completed', 'get').and.callFake(() => given.completed);
    });

    describe('when completed is equal', () => {
      given('len', () => 4);

      it('should return "true"', () => {
        expect(given.focus.isTimeToLong).toBe(true);
      });
    });

    describe('when completed is enough', () => {
      given('len', () => 12);

      it('should return "true"', () => {
        expect(given.focus.isTimeToLong).toBe(true);
      });
    });

    describe('when completed is not enough', () => {
      given('len', () => 3);

      it('should return "false"', () => {
        expect(given.focus.isTimeToLong).toBe(false);
      });
    });

    describe('when completed is not time', () => {
      given('len', () => 5);

      it('should return "false"', () => {
        expect(given.focus.isTimeToLong).toBe(false);
      });
    });
  });

  describe('.time', () => {
    given('input', () => ({
      items: [
        { createdAt: 10, duration: 10, type: DEFAULT_TYPE },
        { createdAt: 20, duration: 10, type: DEFAULT_TYPE },
      ],
    }));

    it('should return total work time', () => {
      const [first, second] = given.focus.items;

      first.time = 20;
      second.time = 40;

      expect(given.focus.time).toBe(20);
    });
  });
});
