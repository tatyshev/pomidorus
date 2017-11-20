export const zeroify = (number, fixed = 2) => {
  const zeros = '0'.repeat(fixed - 1);
  return (zeros + number).slice(-fixed);
};

export const minutes = n => n * 60 * 1000;

export const seconds = n => n * 1000;
