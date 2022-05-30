import { useMutation, useQuery } from "react-query";
import { customAxios } from "../lib/customAxios";

interface DeleteCommentVariable {
  toiletId: number;
  commentId: number;
}

interface PatchCommentVariable {
  toiletId: number;
  commentId: number;
  content: string;
  rating: number;
}

interface PostCommentVariable {
  toiletId: number;
  content: string;
  rating: number;
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

const getMyComment = (toiletId: number, commentId: number) => {
  return customAxios.get(
    `/toilets/${toiletId}/comments?commentId=${commentId}`
  );
};

export const useCommentQuery = (
  toiletId: number,
  commentId: number,
  successCallback: (data: any) => void
) =>
  useQuery(["myComment", commentId], () => getMyComment(toiletId, commentId), {
    select: (res) => res.data.comment,
    onSuccess: (data) => successCallback(data),
  });

const patchComment = (commentInfo: PatchCommentVariable) => {
  return customAxios.patch(
    `/toilets/${commentInfo.toiletId}/comments/${commentInfo.commentId}`,
    {
      content: commentInfo.content,
      rating: commentInfo.rating,
    }
  );
};

export const usePatchComment = () => useMutation(patchComment);

const postComment = (commentInfo: PostCommentVariable) => {
  return customAxios.post(`/toilets/${commentInfo.toiletId}/comments`, {
    content: commentInfo.content,
    rating: commentInfo.rating,
  });
};

export const usePostComment = () => useMutation(postComment);
