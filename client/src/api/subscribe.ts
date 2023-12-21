import { useMutation } from "react-query";
import { customAxios } from "../lib/customAxios";

interface subscribtionVariable {
  expirationTime: any;
  p256Key: string;
  authKey: string;
  endpoint: string;
}

// 알쓸개솔-구독하기 요청
const addSubscribtion = (subscribeInfo: subscribtionVariable) => {
  return customAxios.post("/subscribes", {
    expirationTime: subscribeInfo.expirationTime,
    p256Key: subscribeInfo.p256Key,
    authKey: subscribeInfo.authKey,
    endpoint: subscribeInfo.endpoint,
  });
};

// 알쓸개솔-푸시알림 발송
const issueSubscriptions = () => {
  return customAxios.post("/subscribes/notification");
};

export const useIssueSubscriptionsMutation = () => {
  return useMutation(issueSubscriptions, {
    onSuccess: () => console.log("알림 발송 완료"),
  });
};

export const useAddSubscribtionMutation = (successFn: () => void) =>
  useMutation(addSubscribtion, {
    onSuccess: () => successFn(),
  });
