import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';

declare const self: ServiceWorkerGlobalScope;

clientsClaim();

self.skipWaiting();

precacheAndRoute(self.__WB_MANIFEST);

export default null;
