/**
 * POETICS OF SENSORS - Service Worker
 * 
 * Handles caching, offline functionality, and background sync
 * Enables PWA installation and offline usage
 */

const CACHE_NAME = 'poetics-sensors-v1.0.0';
const STATIC_CACHE = 'poetics-sensors-static-v1';
const DYNAMIC_CACHE = 'poetics-sensors-dynamic-v1';

// Files to cache for offline functionality
const STATIC_FILES = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/sensors.js',
    '/network.js',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

// Files that should always be fetched from network
const NETWORK_FIRST = [
    '/api/',
    '/ws/'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('Service Worker: Caching static files');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('Service Worker: Skip waiting');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Service Worker: Cache failed', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Service Worker: Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Taking control');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
    const requestUrl = new URL(event.request.url);
    
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }
    
    // Skip WebSocket upgrades
    if (event.request.headers.get('upgrade') === 'websocket') {
        return;
    }
    
    // Network first strategy for API calls
    if (NETWORK_FIRST.some(path => requestUrl.pathname.startsWith(path))) {
        event.respondWith(networkFirst(event.request));
        return;
    }
    
    // Cache first strategy for static assets
    event.respondWith(cacheFirst(event.request));
});

// Cache first strategy
async function cacheFirst(request) {
    try {
        // Try to get from cache first
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // If not in cache, fetch from network
        const networkResponse = await fetch(request);
        
        // Cache the response for next time
        if (networkResponse.status === 200) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
        
    } catch (error) {
        console.error('Cache first failed:', error);
        
        // Return offline fallback
        return caches.match('/offline.html') || new Response(
            'Offline - Please check your connection',
            { status: 503, statusText: 'Service Unavailable' }
        );
    }
}

// Network first strategy
async function networkFirst(request) {
    try {
        // Try network first
        const networkResponse = await fetch(request);
        
        // Cache successful responses
        if (networkResponse.status === 200) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
        
    } catch (error) {
        console.log('Network failed, trying cache:', error);
        
        // Fallback to cache
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // No cache available
        throw error;
    }
}

// Background sync for sensor data
self.addEventListener('sync', (event) => {
    console.log('Service Worker: Background sync:', event.tag);
    
    if (event.tag === 'sensor-data-sync') {
        event.waitUntil(syncSensorData());
    }
});

async function syncSensorData() {
    try {
        // Get queued sensor data from IndexedDB
        const queuedData = await getQueuedSensorData();
        
        if (queuedData.length > 0) {
            console.log('Service Worker: Syncing', queuedData.length, 'sensor data items');
            
            // Try to send each item
            for (const data of queuedData) {
                try {
                    await fetch('/api/sensors', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    });
                    
                    // Remove from queue on success
                    await removeSensorDataFromQueue(data.id);
                    
                } catch (error) {
                    console.error('Failed to sync data item:', error);
                }
            }
        }
        
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// IndexedDB helpers for offline data storage
async function getQueuedSensorData() {
    // Simplified - in real implementation would use IndexedDB
    return [];
}

async function removeSensorDataFromQueue(id) {
    // Simplified - in real implementation would use IndexedDB
    return true;
}

// Push notification handling
self.addEventListener('push', (event) => {
    console.log('Service Worker: Push received');
    
    const options = {
        body: event.data ? event.data.text() : 'New sensor data available',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        tag: 'sensor-notification',
        data: {
            url: '/'
        }
    };
    
    event.waitUntil(
        self.registration.showNotification('Poetics of Sensors', options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
    console.log('Service Worker: Notification clicked');
    
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow(event.notification.data.url || '/')
    );
});

// Message handling from main app
self.addEventListener('message', (event) => {
    console.log('Service Worker: Message received:', event.data);
    
    switch (event.data.type) {
        case 'SKIP_WAITING':
            self.skipWaiting();
            break;
            
        case 'GET_VERSION':
            event.ports[0].postMessage({ version: CACHE_NAME });
            break;
            
        case 'CACHE_SENSOR_DATA':
            cacheSensorData(event.data.payload);
            break;
            
        default:
            console.log('Unknown message type:', event.data.type);
    }
});

async function cacheSensorData(data) {
    try {
        // Store sensor data for offline sync
        console.log('Service Worker: Caching sensor data');
        // In real implementation, would store in IndexedDB
        
    } catch (error) {
        console.error('Failed to cache sensor data:', error);
    }
}

// Periodic background tasks (if supported)
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'sensor-health-check') {
        event.waitUntil(performHealthCheck());
    }
});

async function performHealthCheck() {
    try {
        console.log('Service Worker: Performing health check');
        
        // Check sensor availability and app health
        const clients = await self.clients.matchAll();
        
        clients.forEach(client => {
            client.postMessage({
                type: 'HEALTH_CHECK',
                timestamp: Date.now()
            });
        });
        
    } catch (error) {
        console.error('Health check failed:', error);
    }
}

// Error handling
self.addEventListener('error', (event) => {
    console.error('Service Worker: Error occurred:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
    console.error('Service Worker: Unhandled promise rejection:', event.reason);
});

console.log('Service Worker: Loaded and ready');