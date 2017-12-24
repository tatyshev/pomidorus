export const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

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
