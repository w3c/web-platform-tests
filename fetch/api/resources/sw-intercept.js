async function broadcast(msg) {
  for (const client of await clients.matchAll()) {
    client.postMessage(msg);
  }
}

addEventListener('fetch', event => {
  even.waitUntil(broadcast(event.request.url));
  event.respondWith(fetch(event.request));
});