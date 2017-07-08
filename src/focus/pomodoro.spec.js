import Pomodoro, { DEFAULT_DURATION, EVENT_FINISH } from './pomodoro';

let pomodoro = null;

beforeEach(() => {
  pomodoro = new Pomodoro();
  pomodoro.start();
});

describe('Pomodoro.tick()', () => {
  it('should just increment state on every tick', () => {
    expect(pomodoro.state).toBe(0)
    jest.runAllTimers()
    expect(pomodoro.state).toBe(1)
  })

  it('should not increment when state >= duration', () => {
    pomodoro.state = DEFAULT_DURATION
    jest.runAllTimers()
    jest.runAllTimers()
    expect(pomodoro.state).toBe(DEFAULT_DURATION)
  })
})

describe('Pomodoro.isFinished()', () => {
  it('should not return false when pomodoro is not finished', () => {
    expect(pomodoro.isFinished).toBeFalsy()
  })

  it('should return false when pomodoro is not finished', () => {
    pomodoro.state = DEFAULT_DURATION;
    expect(pomodoro.isFinished).toBeTruthy()
  })
})

describe('Pomodoro.pause()', () => {
  describe('when paused', () => {
    it('should add and increase pause counters', () => {
      pomodoro.pause()
      jest.runAllTimers()
      expect(pomodoro.pauses).toEqual({ 0: 1 })
    })
  })

  describe('when paused multiple times', () => {
    it ('should add multiple items into pauses', () => {
      pomodoro.pause()
      jest.runAllTimers()
      jest.runAllTimers()

      expect(pomodoro.pauses).toEqual({ 0: 1 })

      pomodoro.unpause()

      jest.runAllTimers()
      jest.runAllTimers()

      pomodoro.pause()

      jest.runAllTimers()
      jest.runAllTimers()

      expect(pomodoro.pauses).toEqual({ 0: 1 })
    })
  })

  describe('when unpaused', () => {
    it('should not increase or add pause counters', () => {
      jest.runAllTimers()
      expect(pomodoro.pauses).toEqual({});

      jest.runAllTimers()
      expect(pomodoro.pauses).toEqual({});
    })
  })
});
