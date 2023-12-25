import { useMutation } from "react-query";
import { customAxios } from "../lib/customAxios";
import { AxiosResponse } from "axios";

interface subscribtionVariable {
  expirationTime: any;
  p256Key: string;
  authKey: string;
  endpoint: string;
}

interface issueSubscriptionMutateParmas {
  handleSuccess: () => void;
  handleError: () => void;
}

interface addSubscribtionMutateParams {
  handleSuccess: (data: AxiosResponse) => void;
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

export const useIssueSubscriptionsMutation = ({
  handleSuccess,
  handleError,
}: issueSubscriptionMutateParmas) => {
  return useMutation(issueSubscriptions, {
    onSuccess: () => handleSuccess(),
    onError: () => handleError(),
  });
};

export const useAddSubscribtionMutation = ({
  handleSuccess,
}: addSubscribtionMutateParams) =>
  useMutation(addSubscribtion, {
    onSuccess: (data) => handleSuccess(data),
  });
