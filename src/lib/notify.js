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
  navigator.serviceWorker.register('sw.js');

  navigator.serviceWorker.ready.then((reg) => {
    showNotification = (title, options) => reg.showNotification(title, options);
  });
} catch (e) {
  // Nothings Todo
}

const notify = (title, options) => {
  try {
    if (showNotification) showNotification(title, options);
    else createNotification(title, options);
  } catch (e) {
    alert(title); // eslint-disable-line no-alert
  }
};

window.notify = notify;
export default notify;
