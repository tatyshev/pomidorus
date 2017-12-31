const basic = (...args) => new Notification(...args);
let sw = null;

try {
  navigator.serviceWorker.register('sw.js');

  navigator.serviceWorker.ready.then((reg) => {
    sw = (...args) => reg.showNotification(...args);
  });
} catch (e) {
  // Todo
}

export default (...args) => {
  if (sw) sw(...args);
  else basic(...args);
};

