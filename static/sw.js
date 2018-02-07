/* eslint-disable */

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  event
    .waitUntil(clients.matchAll({type: 'window'})
    .then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if ('focus' in client) return client.focus();
      }
    })
  );
});
