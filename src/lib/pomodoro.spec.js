import Pomodoro from './pomodoro';

the('input', () => ({}));
the('pomodoro', () => new Pomodoro(the.input));
the('state', () => the.pomodoro.state);
the('pauses', () => the.state.pauses);

describe('Pomodoro', () => {
  describe('.constructor()', () => {
    it('should set default state', () => {
      spyOn(Date, 'now').and.returnValue(123);
      expect(the.pomodoro.state).toEqual(Pomodoro.state);
    });

    it('should set initial state', () => {
      the('createdAt', () => Date.now());
      the('input', () => ({ createdAt: the.createdAt, type: 'example' }));

      expect(the.pomodoro.createdAt).toBe(the.createdAt);
      expect(the.pomodoro.type).toBe('example');
    });
  });

  describe('.pause()', () => {
    describe('when called first time', () => {
      it('should add pause with { end: null }', () => {
        the.pomodoro.time = 123;

        expect(the.pauses).toEqual([]);
        the.pomodoro.pause();
        expect(the.pauses).toEqual([{ start: the.pomodoro.time, end: null }]);
      });
    });

    describe('when called on existing pause', () => {
      the('input', () => ({ pauses: [{ start: 123, end: null }] }));

      it('should not add extra pause', () => {
        the.pomodoro.pause();
        expect(the.pauses.length).toBe(1);
      });
    });
  });

  describe('.unpause()', () => {
    describe('when pauses not exist', () => {
      it('should not do anything', () => {
        expect(() => the.pomodoro.unpause()).not.toThrow();
        expect(the.pauses.length).toBe(0);
      });
    });

    describe('when pauses exists', () => {
      the('pause', () => ({ start: 123, end: null }));
      the('input', () => ({ pauses: [the.pause] }));

      it('should set "end" property on last pause', () => {
        the.pomodoro.time = 345;
        the.pomodoro.unpause();

        expect(the.pause.end).toBe(345);
      });
    });

    describe('when unpaused at same time', () => {
      it('should remove pause', () => {
        the.pomodoro.pause();
        expect(the.pauses.length).toBe(1);
        the.pomodoro.unpause();
        expect(the.pauses.length).toBe(0);
      });
    });
  });

  describe('.pauses', () => {
    describe('when pauses not exist', () => {
      it('should return zero', () => {
        expect(the.pomodoro.pauses).toBe(0);
      });
    });

    describe('when pauses exist', () => {
      the('input', () => ({ pauses: the.pauses }));

      describe('when one pause', () => {
        the('pauses', () => ([{ start: 100, end: 200 }]));

        it('should return pauses time', () => {
          expect(the.pomodoro.pauses).toBe(100);
        });
      });

      describe('when multiple pause', () => {
        the('pauses', () => ([
          { start: 100, end: 200 },
          { start: 400, end: 500 },
        ]));

        it('should return pauses time', () => {
          expect(the.pomodoro.pauses).toBe(200);
        });
      });
    });

    describe('when pause is active', () => {
      the('input', () => ({ pauses: the.pauses }));
      the('pauses', () => ([{ start: 100, end: null }]));

      it('should return time between "start" and "now"', () => {
        the.pomodoro.time = 200;
        expect(the.pomodoro.pauses).toBe(100);
      });
    });
  });

  describe('.interval', () => {
    the('input', () => ({ createdAt: 10 }));

    it('should return interval between "now" and "createdAt"', () => {
      the.pomodoro.time = 20;
      expect(the.pomodoro.interval).toBe(10);

      the.pomodoro.time = 30;
      expect(the.pomodoro.interval).toBe(20);

      the.pomodoro.time = 40;
      expect(the.pomodoro.interval).toBe(30);
    });

    it('should not increase when paused', () => {
      the.pomodoro.time = 20;

      expect(the.pomodoro.interval).toBe(10);

      the.pomodoro.pause();
      the.pomodoro.time = 30;

      expect(the.pomodoro.interval).toBe(10);
    });
  });

  describe('.elapsed', () => {
    the('input', () => ({ createdAt: 10, duration: 10 }));

    it('should return "elapsed" time from createdAt', () => {
      the.pomodoro.time = 15;
      expect(the.pomodoro.elapsed).toBe(5);

      the.pomodoro.time = 20;
      expect(the.pomodoro.elapsed).toBe(0);
    });
  });

  describe('.finished', () => {
    the('input', () => ({ duration: 10 }));

    describe('when time not finished', () => {
      it('should return "false"', () => {
        expect(the.pomodoro.finished).toBe(false);
      });
    });

    describe('when time finished', () => {
      it('should return "true"', () => {
        spyOnProperty(the.pomodoro, 'interval', 'get').and.returnValue(10);
        expect(the.pomodoro.finished).toBe(true);
      });
    });
  });
});
