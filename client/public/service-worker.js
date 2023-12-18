console.log("Service-worker run...");

self.addEventListener("push", function (event) {
  console.log("event: ", event);
  console.log("event.data: ", event.data);
  const payload = event.data ? event.data.text() : "No payload";
  event.waitUntil(
    self.registration.showNotification("Web Push Notification", {
      body: payload,
    })
  );
});
