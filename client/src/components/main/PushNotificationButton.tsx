import { useAddSubscribtionMutation } from "../../api/subscribe";
import { arrayBufferToBase64 } from "../../lib/utils";

const APPLICATION_SERVER_KEY =
  "BBSrEAyO1SN5rRei93KLnsR6KQswGlWRHiLHeYpMY9dwC9n-eVByPlD5j9d2jdTth03KrF__5XUvu7R6ObdckAY";

const PushNotificationButton = () => {
  const addSubscribtionMutation = useAddSubscribtionMutation(() => {});

  // 알쓸개솔-구독등록
  const handleSubscribe = () => {
    navigator.serviceWorker.ready.then((registration) => {
      registration.pushManager.getSubscription().then(() => {
        registration.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: APPLICATION_SERVER_KEY,
          })
          .then((subscribtionInfo) => {
            const { endpoint, expirationTime } = subscribtionInfo;
            const p256dhArrayBuffer = subscribtionInfo.getKey("p256dh");
            const authKeyArrayBuffer = subscribtionInfo.getKey("auth");
            console.log({ subscribtionInfo });

            const p256dh = arrayBufferToBase64(p256dhArrayBuffer);
            const authKey = arrayBufferToBase64(authKeyArrayBuffer);
            if (!p256dh || !authKey) return;

            addSubscribtionMutation.mutate({
              expirationTime,
              p256Key: p256dh,
              authKey,
              endpoint,
            });
          });
      });
    });
  };

  return (
    <div
      onClick={handleSubscribe}
      className="absolute left-[21px] top-[195px] pr-5 flex cursor-pointer items-center"
    >
      <div className="w-11 h-11 bg-white shadow-navButton rounded-full flex justify-center items-center mr-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
      </div>
    </div>
  );
};

export default PushNotificationButton;
