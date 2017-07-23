import Pending, { DEFAULT_INTERVAL } from './pending';

const tick = () => jasmine.clock().tick(DEFAULT_INTERVAL);
let pending = null;

beforeEach(() => {
  jasmine.clock().uninstall();
  jasmine.clock().install();

  pending = new Pending();
});

afterEach(() => {
  jasmine.clock().uninstall();
});

describe('Pending.tick()', () => {
  describe('when started', () => {
    it('should just increment state on every tick', () => {
      pending.start();

      expect(pending.state).toBe(0);
      tick();
      expect(pending.state).toBe(1);
    });
  });

  describe('when stopped', () => {
    it('should not increment state on every tick', () => {
      pending.stop();

      expect(pending.state).toBe(0);
      tick();
      expect(pending.state).toBe(0);
    });
  });
});
