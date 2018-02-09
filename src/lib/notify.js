const alert = new Audio('alert.mp3');

const createNotification = (title, options) => {
  const notification = new Notification(title, options);

  notification.onclick = () => {
    window.focus();
    notification.close();
  };

  return notification;
};

let showNotification = null;

try {
  navigator.serviceWorker.register('sw.js?v=2');

  navigator.serviceWorker.ready.then((reg) => {
    showNotification = (title, options) => reg.showNotification(title, options);
  });
} catch (e) {
  // Nothings Todo
}

const notify = (title, options) => {
  const { sounds } = options;
  delete options.sounds; // eslint-disable-line no-param-reassign

  try {
    if (showNotification) showNotification(title, options);
    else createNotification(title, options);
    if (sounds) alert.play();
  } catch (e) {
    alert(title); // eslint-disable-line no-alert
  }
};

window.notify = notify;
export default notify;
