import humanizeDuration from 'humanize-duration';

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

function generateRectangle(color, size = 16) {
  const c = document.createElement('canvas');
  c.height = size;
  c.width = size;
  const context = c.getContext('2d');
  context.fillStyle = color;
  context.fillRect(0, 0, c.width, c.height);

  return c.toDataURL();
}

export function generateTimeIcon(remainingSecs, perc) {
  // create an alternating color canvas to notify the user
  const remainingSeconds = Math.round(Math.max(remainingSecs, 0));
  if (remainingSeconds <= 0 && perc) {
    return generateRectangle(Math.abs(remainingSeconds) % 2 === 0 ? '#e11' : 'transparent');
  }
  const c = document.createElement('canvas');
  c.height = 16;
  c.width = 16;
  const context = c.getContext('2d');
  const timerMinutes = Math.floor(remainingSeconds / 60);
  const timerSeconds = remainingSeconds % 60;
  context.fillStyle = '#eee';
  context.fillRect(0, 0, context.canvas.height, context.canvas.width);
  // TODO draw percentage
  context.fillStyle = 'black';
  if (timerMinutes > 0) {
    context.font = '7pt Arial';
    context.fillText(`${timerMinutes}`.padStart(2, '0'), 0, 7);
    context.font = '9pt Arial';
    context.fillText(`${timerSeconds}`.padStart(2, '0'), 2, 16);
  } else {
    context.font = '10pt Arial';
    context.textAlign = 'center';
    context.fillText(`${timerSeconds}`.padStart(2, '0'), 8, 12);
  }

  return c.toDataURL();
}

const initialIcons = [];

export function changePageIcon(base64Image) {
  if (!initialIcons.length) {
    [...document.getElementsByTagName('link')].forEach((icon) => {
      if (icon.getAttribute('rel') === 'icon') {
        initialIcons.push(document.head.removeChild(icon));
      }
    });
  }

  const currentIcon = document.getElementById('__timer-icon');
  if (currentIcon) document.head.removeChild(currentIcon);

  const icon = document.createElement('link');
  icon.rel = 'icon';
  icon.type = 'image/png';
  icon.id = '__timer-icon';
  document.head.appendChild(icon);
  icon.href = base64Image;
}

let initialTitle;
export function changePageTitle(title) {
  if (!initialTitle) {
    initialTitle = document.title;
  }

  document.title = title;
}

export function resetPageTitle() {
  document.title = initialTitle;
  initialTitle = '';
}

export function resetPageIcon() {
  const currentIcon = document.getElementById('__timer-icon');
  if (currentIcon) document.head.removeChild(currentIcon);

  initialIcons.forEach((icon) => {
    document.head.appendChild(icon);
  });
  initialIcons.length = 0;
}

const humanize = humanizeDuration.humanizer({
  language: 'short',
  languages: {
    short: {
      h: () => 'h',
      m: () => 'm',
      s: () => 's',
    },
  },
});

export function formatTimeForTitle(time) {
  return humanize(time, {
    spacer: '',
    round: true,
  });
}
