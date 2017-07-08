jest.useFakeTimers();

let state = 0;

setInterval(() => state++, 1000);

test('', () => {
  expect(state).toBe(0);
  jest.runTimersToTime(1000);
  expect(state).toBe(1);
  jest.runTimersToTime(1000);
  expect(state).toBe(2);
  jest.runTimersToTime(1000);
  expect(state).toBe(3);
  jest.runTimersToTime(1000);
  expect(state).toBe(4);
});
