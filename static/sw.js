/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */

try {
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
  });
} catch (e) {
  console.error(e);
}
