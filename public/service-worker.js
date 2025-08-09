self.addEventListener("install", (event) => {
  event.waitUntil(caches.open("app-shell-v1").then((cache) => cache.addAll(["/", "/favicon.ico"])))
})
self.addEventListener("fetch", (event) => {
  const { request } = event
  if (request.method !== "GET") return
  // Basic cache-first for same-origin assets
  if (new URL(request.url).origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then((cached) => {
        return (
          cached ||
          fetch(request)
            .then((res) => {
              const copy = res.clone()
              caches.open("app-shell-v1").then((cache) => cache.put(request, copy))
              return res
            })
            .catch(() => cached)
        )
      }),
    )
  }
})
