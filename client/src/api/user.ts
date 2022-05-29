import { useMutation, useQuery } from "react-query";
import { customAxios } from "../lib/customAxios";

const userLogout = ({}) => {
  return customAxios.post("/users/logout", {});
};

export const useLogoutQuery = () => useMutation(userLogout);

const tokenValidation = () => {
  return customAxios.get("/users/token");
};

export const useTokenValidationQuery = () =>
  useQuery("token", tokenValidation, {
    select: (res) => {
      return { status: res.status, id: res.data.id };
    },
  });

const getUserInfo = () => {
  return customAxios.get("/users");
};

export const useUserInfoQuery = () =>
  useQuery("userInfo", getUserInfo, {
    select: (res) => {
      return res.data.userInfo;
    },
  });
