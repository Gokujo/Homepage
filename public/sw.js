const CACHE_NAME = 'mh-cache-v1'
const ASSETS = ['/', '/index.html', '/robots.txt']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)
  // Skip non-HTTP(S) requests (e.g., chrome-extension://)
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return
  // NetworkFirst for navigations
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then((resp) => {
        const copy = resp.clone()
        caches.open(CACHE_NAME).then((c) => { if (resp.ok && (url.protocol === 'http:' || url.protocol === 'https:')) c.put(req, copy) })
        return resp
      }).catch(() => caches.match(req).then((r) => r || caches.match('/index.html')))
    )
    return
  }
  // CacheFirst for images and sitemap.xml
  if (req.destination === 'image') {
    event.respondWith(
      caches.match(req).then((cached) => cached || fetch(req).then((resp) => {
        const copy = resp.clone()
        caches.open(CACHE_NAME).then((c) => { if (resp.ok && (url.protocol === 'http:' || url.protocol === 'https:')) c.put(req, copy) })
        return resp
      }))
    )
    return
  }
  if (url.pathname.endsWith('/sitemap.xml')) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const fetchPromise = fetch(req, { cache: 'no-store' }).then((resp) => {
          const copy = resp.clone()
          caches.open(CACHE_NAME).then((c) => { if (resp.ok && (url.protocol === 'http:' || url.protocol === 'https:')) c.put(req, copy) })
          return resp
        }).catch(() => cached)
        return cached || fetchPromise
      })
    )
    return
  }
  // StaleWhileRevalidate for assets
  if ([ 'style', 'script', 'worker' ].includes(req.destination)) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const fetchPromise = fetch(req).then((resp) => {
          const copy = resp.clone()
          caches.open(CACHE_NAME).then((c) => { if (resp.ok && (url.protocol === 'http:' || url.protocol === 'https:')) c.put(req, copy) })
          return resp
        })
        return cached || fetchPromise
      })
    )
  }
})


