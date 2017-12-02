import given from 'given2';
import Pomodoro from './pomodoro';

given('input', () => ({}));
given('pomodoro', () => new Pomodoro(given.input));
given('state', () => given.pomodoro.state);
given('pauses', () => given.state.pauses);

describe('Pomodoro', () => {
  describe('.constructor()', () => {
    it('should set default state', () => {
      spyOn(Date, 'now').and.returnValue(123);
      expect(given.pomodoro.state).toEqual(Pomodoro.state);
    });

    it('should set initial state', () => {
      given('createdAt', () => Date.now());
      given('input', () => ({ createdAt: given.createdAt, type: 'example' }));

      expect(given.pomodoro.createdAt).toBe(given.createdAt);
      expect(given.pomodoro.type).toBe('example');
    });
  });

  describe('.pause()', () => {
    describe('when called first time', () => {
      it('should add pause with { end: null }', () => {
        given.pomodoro.time = 123;

        expect(given.pauses).toEqual([]);
        given.pomodoro.pause();
        expect(given.pauses).toEqual([{ start: given.pomodoro.time, end: null }]);
      });
    });

    describe('when called on existing pause', () => {
      given('input', () => ({ pauses: [{ start: 123, end: null }] }));

      it('should not add extra pause', () => {
        given.pomodoro.pause();
        expect(given.pauses.length).toBe(1);
      });
    });
  });

  describe('.unpause()', () => {
    describe('when pauses not exist', () => {
      it('should not do anything', () => {
        expect(() => given.pomodoro.unpause()).not.toThrow();
        expect(given.pauses.length).toBe(0);
      });
    });

    describe('when pauses exists', () => {
      given('input', () => ({ pauses: [{ start: 123, end: null }] }));
      given('pause', () => given.pomodoro.state.pauses[0]);

      it('should set "end" property on last pause', () => {
        given.pomodoro.time = 345;
        given.pomodoro.unpause();

        expect(given.pause.end).toBe(345);
      });
    });

    describe('when unpaused at same time', () => {
      it('should remove pause', () => {
        given.pomodoro.pause();
        expect(given.pauses.length).toBe(1);
        given.pomodoro.unpause();
        expect(given.pauses.length).toBe(0);
      });
    });
  });

  describe('.pauses', () => {
    describe('when pauses not exist', () => {
      it('should return zero', () => {
        expect(given.pomodoro.pauses).toBe(0);
      });
    });

    describe('when pauses exist', () => {
      given('input', () => ({ pauses: given.pauses }));

      describe('when one pause', () => {
        given('pauses', () => ([{ start: 100, end: 200 }]));

        it('should return pauses time', () => {
          expect(given.pomodoro.pauses).toBe(100);
        });
      });

      describe('when multiple pause', () => {
        given('pauses', () => ([
          { start: 100, end: 200 },
          { start: 400, end: 500 },
        ]));

        it('should return pauses time', () => {
          expect(given.pomodoro.pauses).toBe(200);
        });
      });
    });

    describe('when pause is active', () => {
      given('input', () => ({ pauses: given.pauses }));
      given('pauses', () => ([{ start: 100, end: null }]));

      it('should return time between "start" and "now"', () => {
        given.pomodoro.time = 200;
        expect(given.pomodoro.pauses).toBe(100);
      });
    });
  });

  describe('.interval', () => {
    given('input', () => ({ createdAt: 10 }));

    it('should return interval between "now" and "createdAt"', () => {
      given.pomodoro.time = 20;
      expect(given.pomodoro.interval).toBe(10);

      given.pomodoro.time = 30;
      expect(given.pomodoro.interval).toBe(20);

      given.pomodoro.time = 40;
      expect(given.pomodoro.interval).toBe(30);
    });

    it('should not increase when paused', () => {
      given.pomodoro.time = 20;

      expect(given.pomodoro.interval).toBe(10);

      given.pomodoro.pause();
      given.pomodoro.time = 30;

      expect(given.pomodoro.interval).toBe(10);
    });
  });

  describe('.elapsed', () => {
    given('input', () => ({ createdAt: 10, duration: 10 }));

    it('should return "elapsed" time from createdAt', () => {
      given.pomodoro.time = 15;
      expect(given.pomodoro.elapsed).toBe(5);

      given.pomodoro.time = 20;
      expect(given.pomodoro.elapsed).toBe(0);
    });
  });

  describe('.finished', () => {
    given('input', () => ({ duration: 10 }));

    describe('when time not finished', () => {
      it('should return "false"', () => {
        expect(given.pomodoro.finished).toBe(false);
      });
    });

    describe('when time finished', () => {
      it('should return "true"', () => {
        spyOnProperty(given.pomodoro, 'interval', 'get').and.returnValue(10);
        expect(given.pomodoro.finished).toBe(true);
      });
    });
  });
});
