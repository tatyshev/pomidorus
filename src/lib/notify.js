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
  debugger;
}

const notify = (title, options) => {
  try {
    return createNotification(title, options);
  } catch (e) {
    // Nothings Todo
  }

  if (showNotification) return showNotification(title, options);
  return alert(title); // eslint-disable-line no-alert
};

export default notify;
