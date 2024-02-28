self.addEventListener('install', event => self.skipWaiting());

self.addEventListener("activate", event => {
    self.registration.unregister()
        .then(() => self.clients.matchAll())
        .then(clients => clients.forEach(client => client.navigate(client.url)));
});

