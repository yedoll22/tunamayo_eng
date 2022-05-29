import { useMutation, useQuery } from "react-query";
import { customAxios } from "../lib/customAxios";

interface DeleteCommentVariable {
  toiletId: number;
  commentId: number;
}

const getAllComments = (toiletId: number | undefined) => {
  return customAxios.get(`/toilets/${toiletId}/comments`);
};

export const useAllCommentsQuery = (toiletId: number | undefined) =>
  useQuery(["allComments", toiletId], () => getAllComments(toiletId), {
    select: (res) => {
      return res.data.commentList;
    },
  });

const deleteComment = (commentInfo: DeleteCommentVariable) => {
  return customAxios.delete(
    `/toilets/${commentInfo.toiletId}/comments/${commentInfo.commentId}`
  );
};

export const useDeleteComment = () => useMutation(deleteComment);
