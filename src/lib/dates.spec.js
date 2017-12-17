import { today } from './dates';

describe('Dates', () => {
  describe('.today', () => {
    it('should return today date as string', () => {
      const MyDate = Date;
      spyOn(window, 'Date').and.callFake(() => new MyDate('2017-12-17T14:30:00.308Z'));
      expect(today()).toBe('17:11:2017');
    });
  });
});
