const CACHE_NAME = "gugu-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "./", // root (index.html)
        "./index.html", // main page
        "./styles/style.css", // CSS
        "./scripts/main.js", // JS
        "./images/android-chrome-192x192.png",
        "./images/android-chrome-512x512",
        "./images/favicon-16x16",
        "./images/favicon-32x32",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
