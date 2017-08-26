import Focus from './index';
import Pomodoro from './pomodoro';

xdescribe('Focus', () => {
  describe('initialize', () => {
    describe('when initial state not given', () => {
      it('should create Focus with default state', () => {
        const focus = new Focus();
        expect(focus.state).toEqual(Focus.state);
      });
    });

    describe('when initial state given', () => {
      it('should create Focus with given state', () => {
        const state = {
          items: [{
            createdAt: '2017-08-16T10:04:15.294Z',
            duration: 1500000,
            type: 'DEFAULT',
            pauses: [],
          }],
          target: 10,
          longAfter: 4,
          durations: { DEFAULT: 1500000, SHORT: 300000, LONG: 900000 },
        };

        const focus = new Focus(state);

        expect(focus.current instanceof Pomodoro).toBeTruthy();

        expect(focus.current.state).toEqual({
          createdAt: '2017-08-16T10:04:15.294Z',
          duration: 1500000,
          type: 'DEFAULT',
          pauses: [],
        });
      });
    });
  });

  describe('getState', () => {
    describe('when items are empty', () => {
      it('should return plain object without items', () => {
        const focus = new Focus();

        expect(focus.getState()).toEqual({
          items: [],
          target: 10,
          longAfter: 4,
          durations: { DEFAULT: 1500000, SHORT: 300000, LONG: 900000 },
        });
      });
    });

    describe('when items not empty', () => {
      it('should return plain object with items', () => {
        const focus = new Focus();
        const now = new Date();

        spyOn(window, 'Date').and.returnValue(now);

        focus.play();

        expect(focus.getState()).toEqual({
          items: [{
            createdAt: now.toISOString(),
            duration: 1500000,
            type: 'DEFAULT',
            pauses: [],
          }],
          target: 10,
          longAfter: 4,
          durations: { DEFAULT: 1500000, SHORT: 300000, LONG: 900000 },
        });
      });
    });
  });
});
