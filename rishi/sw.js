// Service Worker for Rishi Rhythm PWA
const CACHE_NAME = 'rishi-rhythm-v1.0.0';
const urlsToCache = [
  '/rishi/',
  '/rishi/index.html',
  '/rishi/app.js',
  '/rishi/manifest.json',
  '/rishi/audio/shuddh/mantra01.mp3',
  '/rishi/audio/shuddh/mantra02.mp3',
  '/rishi/audio/shuddh/mantra03.mp3',
  // Add more mantra files as needed
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600&display=swap',
  'https://unpkg.com/suncalc@1.9.0/suncalc.js'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache.map(url => {
          return new Request(url, { cache: 'reload' });
        }));
      })
      .catch((error) => {
        console.log('Cache addAll failed:', error);
        // Continue installation even if some resources fail
        return Promise.resolve();
      })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - Network first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Skip chrome-extension and non-http requests
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseToCache);
          });

        return response;
      })
      .catch(() => {
        // If network fails, try to get from cache
        return caches.match(event.request)
          .then((response) => {
            if (response) {
              return response;
            }

            // If it's a navigation request and not in cache, return index.html
            if (event.request.destination === 'document') {
              return caches.match('/rishi/index.html');
            }

            return new Response('Offline content not available', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain',
              }),
            });
          });
      })
  );
});

// Handle background sync for offline mantra downloads
self.addEventListener('sync', (event) => {
  if (event.tag === 'download-mantras') {
    event.waitUntil(downloadMantras());
  }
});

async function downloadMantras() {
  const cache = await caches.open(CACHE_NAME);
  const mantraUrls = [];

  // Generate URLs for all 50 mantras
  for (let i = 1; i <= 50; i++) {
    const mantraNumber = i.toString().padStart(2, '0');
    mantraUrls.push(`/rishi/audio/shuddh/mantra${mantraNumber}.mp3`);
  }

  // Try to cache mantra files
  try {
    await cache.addAll(mantraUrls.map(url => new Request(url, { cache: 'reload' })));
    console.log('All mantras cached successfully');
  } catch (error) {
    console.log('Some mantras failed to cache:', error);
  }
}