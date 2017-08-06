import * as core from './index';

describe('Core', () => {
  describe('empty', () => {
    it('should return initial state', () => {
      expect(core.empty()).toEqual({ stack: [] });
    });
  });

  describe('last', () => {
    it('should return last array element', () => {
      const arr = [1, 2, 3];
      expect(core.last(arr)).toBe(3);
    });
  });
});
