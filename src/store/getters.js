import { DEFAULT_TYPE, SHORT_TYPE, LONG_TYPE } from './const';

export default {
  current(state) {
    return state.items[state.items.length - 1];
  },

  duration(state) {
    if (!state.current) return 0;
    return state.current.duration;
  },

  interval(state) {
    if (!state.current) { return 0; }
    return state.current.interval;
  },

  pauses(state) {
    if (!state.current) return 0;
    return state.current.pauses;
  },

  elapsed(state) {
    if (!state.current) return 0;
    return state.current.elapsed;
  },

  isTimeToLong(state, getters) {
    return (getters.completed.length % state.longAfter) === 0;
  },

  completed(state) {
    return state.items.filter(item => item.type === DEFAULT_TYPE && item.finished);
  },

  isEmpty(state) {
    return state.items.length === 0;
  },

  isWork(state) {
    return state.current && state.current.type === DEFAULT_TYPE;
  },

  isShort(state) {
    return state.current && state.current.type === SHORT_TYPE;
  },

  isLong(state) {
    return state.current && state.current.type === LONG_TYPE;
  },

  isActive(state) {
    return state.current && !state.current.finished;
  },

  isPaused(state) {
    return state.current !== undefined && state.current.paused;
  },
};
