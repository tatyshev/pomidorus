export const zeroify = (number, fixed = 2) => {
  const zeros = '0'.repeat(fixed - 1);
  return (zeros + number).slice(-fixed);
};

export const today = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${day}:${month}:${year}`;
};

export const minutes = n => n * 60 * 1000;

export const seconds = n => n * 1000;
