export const array = n => [...Array(n)];

export const zeroify = (number, fixed = 2) => {
  const zeros = '0'.repeat(fixed - 1);
  return (zeros + number).slice(-fixed);
};

export const dayMonthYear = (date) => {
  date = new Date(date); // eslint-disable-line no-param-reassign

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${day}:${month}:${year}`;
};

export const today = () => dayMonthYear(new Date());
export const seconds = n => n * 1000;
export const minutes = n => n * seconds(60);
export const hours = n => n * minutes(60);
export const days = n => n * hours(24);
