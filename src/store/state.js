import { DEFAULT_TYPE, SHORT_TYPE, LONG_TYPE } from './const';

export default {
  now: Date.now(),
  items: [],
  target: 10,
  longAfter: 4,
  durations: {
    [DEFAULT_TYPE]: 0.1 * 60 * 1000,
    [SHORT_TYPE]: 0.1 * 60 * 1000,
    [LONG_TYPE]: 0.1 * 60 * 1000,
  },
};
