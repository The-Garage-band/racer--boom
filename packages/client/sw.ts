import {createHandlerBoundToURL, precacheAndRoute} from 'workbox-precaching';
import {NavigationRoute, registerRoute} from 'workbox-routing';
import {CacheFirst, StaleWhileRevalidate} from 'workbox-strategies';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';
import {RangeRequestsPlugin} from 'workbox-range-requests';
import {skipWaiting, clientsClaim} from 'workbox-core';

// Сюда попадет то, что нужно сохранить
declare let self: ServiceWorkerGlobalScope;
precacheAndRoute(self.__WB_MANIFEST);

// Сохраняем шрифты
registerRoute(/.*\.(?:ttf|otf|woff|woff2)/,
    new CacheFirst({
      cacheName: 'fonts',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    }),
);

// Сохраняем картинки
registerRoute(/.*\.(?:png|jpg|svg)/,
    new CacheFirst({
      cacheName: 'images',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    }),
);

// Сохраняем звуки
registerRoute(
    ({request}) => {
      const {destination} = request;
      return destination === 'audio';
    },
    new CacheFirst({
      cacheName: 'audio',
      plugins: [
        new CacheableResponsePlugin({statuses: [200]}),
        new RangeRequestsPlugin(),
      ],
    }),
);
caches.open('audio').then(function(cache) {
  cache.add('/sounds/Kavinsky & Lovefoxxx - Nightcall.mp3');
  cache.add('/sounds/Golden Earring - Radar Love.mp3');
  cache.add('/sounds/Focus - Hocus Pocus.mp3');
  cache.add('/sounds/Incredible Bongo Band - Bongolia.mp3');
  cache.add('/sounds/The Damned - Neat Neat Neat.mp3');
  cache.add('/sounds/The Jon Spencer Blues Explosion - Bellbottoms.mp3');
  cache.add('/sounds/Twisted Sister - We\'re Not Gonna Take It.mp3');
  cache.add('/sounds/Bee Gees - Stayin\' Alive.mp3');
  cache.add('/sounds/Blondie - One Way or Another.mp3');
  cache.add('/game/collectcoin.mp3');
  cache.add('/game/crush.mp3');
  cache.add('/game/crush1.mp3');
  cache.add('/game/gameover.mp3');
  cache.add('/game/repare.mp3');
}).catch(function(error) {
  console.log('Error cached audio: ', error);
});

// Сохраняем api данные с яндекса
registerRoute(
    ({url}) => url.origin === 'https://ya-praktikum.tech',
    new StaleWhileRevalidate({
      cacheName: 'yandex-api-response',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ]
    })
);

// Маршрутизация
registerRoute(new NavigationRoute(createHandlerBoundToURL('index.html')));

skipWaiting();
clientsClaim();
