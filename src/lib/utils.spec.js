import { zeroify, minutes, seconds, propsLimit } from './utils';

describe('utils', () => {
  describe('.propsLimit', () => {
    it('should pick only limited prop list', () => {
      const result = propsLimit({ one: 1, two: 2, three: 3 }, 2);
      expect(result).toEqual({ one: 1, two: 2 });
    });
  });

  describe('.zeroify', () => {
    describe('when number length is 1', () => {
      it('should add zero', () => {
        expect(zeroify(1)).toBe('01');
        expect(zeroify(2)).toBe('02');
      });
    });

    describe('when number length 2', () => {
      it('should not add zero', () => {
        expect(zeroify(10)).toBe('10');
        expect(zeroify(20)).toBe('20');
      });
    });

    describe('when fixed given', () => {
      it('should render zeros according given fixed', () => {
        expect(zeroify(1, 4)).toBe('0001');
        expect(zeroify(10, 4)).toBe('0010');
        expect(zeroify(222, 4)).toBe('0222');
      });
    });
  });

  describe('.minutes', () => {
    it('should return milliseconds', () => {
      expect(minutes(1)).toBe(60000);
      expect(minutes(2)).toBe(120000);
    });
  });

  describe('.seconds', () => {
    it('should return milliseconds', () => {
      expect(seconds(1)).toBe(1000);
      expect(seconds(2)).toBe(2000);
    });
  });
});
