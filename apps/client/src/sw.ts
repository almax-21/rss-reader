import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';

import { API_ORIGIN, DELETE_AUTH_CACHE } from './types';

declare const self: ServiceWorkerGlobalScope;

self.__WB_DISABLE_DEV_LOGS = true;

clientsClaim();

self.skipWaiting();

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
	({ request }) => request.destination === 'document',
	new CacheFirst({
		cacheName: 'document',
		plugins: [
			new CacheableResponsePlugin({
				statuses: [0, 200],
			}),
		],
	})
);

registerRoute(
	({ url }) => url.origin === API_ORIGIN && url.pathname === '/user/auth',
	new NetworkFirst({
		cacheName: 'auth-api-response',
	})
);

registerRoute(
	({ url }) => url.origin === API_ORIGIN && url.pathname === '/feeds',
	new NetworkFirst({
		cacheName: 'content-api-response',
		networkTimeoutSeconds: 10,
	})
);

self.addEventListener('message', (evt: ExtendableMessageEvent) => {
	if (evt.data === DELETE_AUTH_CACHE) {
		self.caches.delete('auth-api-response');
	}
});
