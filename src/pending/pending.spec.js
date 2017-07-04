import Pending from './pending';

let pending = null;

beforeEach(() => {
  pending = new Pending();
});

test('tick()', () => {
  expect(pending.state).toBe(0);

  pending.tick();

  expect(pending.state).toBe(1);
});
