// Service worker installation event
self.addEventListener('install', event => {
    // Skip waiting to activate the service worker immediately
    self.skipWaiting();
});

// Service worker activation event
self.addEventListener("activate", event => {
    // Unregister the current service worker
    self.registration.unregister()
        .then(() => {
            // Retrieve all active clients associated with the service worker
            return self.clients.matchAll();
        })
        .then(clients => {
            // For each client, navigate to the same URL to reload the page
            clients.forEach(client => client.navigate(client.url));
        });
});
