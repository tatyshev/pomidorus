import Focus from '.';

let focus = null;

beforeEach(() => {
  focus = new Focus();
})

describe('when isEmpty', () => {
  test('rotate()', () => {
    expect(focus.isEmpty).toBeTruthy();

    focus.rotate();
    let latest = focus.latest;

    expect(focus.isEmpty).toBeFalsy();
    expect(latest.state).toBe(0);

    jest.runAllTimers();

    expect(latest.state).toBe(1);
  })
})
