export const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export const propsLimit = (obj, limit) => {
  const result = {};
  const keys = Object.keys(obj).slice(0, limit);
  keys.forEach((key) => { result[key] = obj[key]; });
  return result;
};

export const array = n => [...Array(n)];

export const zeroify = (number, fixed = 2) => {
  const zeros = '0'.repeat(fixed - 1);
  return (zeros + number).slice(-fixed);
};

export const dayMonth = (date) => {
  date = new Date(date); // eslint-disable-line no-param-reassign

  const month = MONTHS[date.getMonth()];
  const day = date.getDate();

  return `${day} ${month}`;
};

export const today = () => dayMonth(new Date());
export const seconds = n => n * 1000;
export const minutes = n => n * seconds(60);
export const hours = n => n * minutes(60);
export const days = n => n * hours(24);

export const reachGoal = (...args) => {
  if (window.yaCounter) {
    window.yaCounter.reachGoal(...args);
  }
};
