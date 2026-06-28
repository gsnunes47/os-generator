const CACHE_NAME = "os-v1";

const FILES = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./mman.png",
  "./manifest.json",
];

// Instala o Service Worker e salva os arquivos em cache
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES)));
});

// Remove caches antigos quando houver atualização
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      ),
  );
});

// Intercepta requisições
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});
