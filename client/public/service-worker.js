console.log("Service-worker run...");

// 알쓸개솔-서비스워커 스코프
self.addEventListener('install', (event) => {
  console.log('install', { event });
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("push", function (event) {
  console.log("event: ", event);
  console.log("event.data: ", event.data);
  const payload = event.data ? event.data.text() : "No payload";

  console.log({ payload })

  event.waitUntil(
    self.registration.showNotification("알쓸개솔 92회차", {
      body: payload,
    })
  );
});
