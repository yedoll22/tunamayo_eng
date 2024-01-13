console.log("Service-worker run...");

const CACHE_NAME = 'toilet-list'

// 알쓸개솔-서비스워커 스코프
self.addEventListener('install', (event) => {
  console.log('install', { event });
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("push", function (event) {
  console.log("push event: ", event);
  
  const payload = event.data ? event.data.text() : "No payload";

  console.log({ payload })

  event.waitUntil(
    self.registration.showNotification("알쓸개솔 92회차", {
      body: payload,
    })
  );
});

self.addEventListener("fetch", function (event) {
  console.log("fetch event: ", event);

  if (event.request.url === "https://server.tunamayo-toilet.com/toilets") {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            console.log("캐시에서 응답 발견")
            return response;
          }
  
          return fetch(event.request).then(response => {
            if (!response || response.status !== 200) {
              console.log("기본 네트워크 응답 event.request : ", event.request);
              console.log("기본 네트워크 응답 response : ", response);
              return response;
            }
  
            const responseToCache = response.clone();
            console.log('응답 복사')
  
            caches.open(CACHE_NAME)
              .then(cache => {
                // 캐시에 저장
                console.log("캐시에 저장")

                cache.put(event.request, responseToCache);
                return cache
              }).then(c => console.log("캐시 저장 완료", c));
  
            return response;
          });
        })
    );
  }
});
