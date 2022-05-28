import { useMutation, useQuery } from "react-query";
import { customAxios } from "../lib/customAxios";

export const getUserInfo = () => {
  return customAxios.get("/users/token");
};

export const useUserInfoQuery = () =>
  useQuery("userInfo", getUserInfo, {
    select: (res) => {
      return { status: res.status, id: res.data.id };
    },
  });

export const getAllComments = (toiletId: string | undefined) => {
  return customAxios.get(`/toilets/${toiletId}/comments`);
};

export const useAllCommentsQuery = (toiletId: string | undefined) =>
  useQuery(["allComments", toiletId], () => getAllComments(toiletId), {
    select: (res) => {
      return res.data.commentList;
    },
  });

export const deleteComment = (toiletId: number, commentId: number) => {
  return customAxios.delete(`/toilets/${toiletId}/comments/${commentId}`);
};

export const useDeleteComment = (toiletId: number, commentId: number) =>
  useMutation(() => deleteComment(toiletId, commentId));
