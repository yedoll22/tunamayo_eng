import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { displayModal, hideModal } from "../slices/modalSlice";
import { RootState } from "../store/store";
import Modal from "./Modal";
import StarRating from "./StarRating";
import { CommentProps } from "../types/comment";
import { useDeleteComment, useUserInfoQuery } from "../api/comment";

const Comment = ({
  content,
  nickname,
  rating,
  userId,
  toiletId,
  commentId,
  setDeleteState,
  deleteState,
  createdAt,
}: CommentProps) => {
  const [isMine, setIsMine] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteModal = useSelector<RootState>((state) => state.modal.value);
  const userInfo = useUserInfoQuery();

  useEffect(() => {
    if (userInfo?.data?.status === 200 && userInfo?.data?.id === userId)
      setIsMine(true);
  }, [userId, userInfo]);
  const deleteComment = useDeleteComment(toiletId, commentId);
  const deleteHandler = async () => {
    console.log("deleteState1 : ", deleteState);
    deleteComment.mutate();
    setDeleteState(true);
    console.log("deleteState2 : ", deleteState);
    dispatch(hideModal());
    setDeleteState(false);
    console.log("deleteState3 : ", deleteState);
  };

  return (
    <>
      <div className="px-5 py-4 border-b border-gray20">
        <div className="flex justify-between">
          <div className="font-medium text-tnBlack text-base leading-[26px]">
            {nickname}
          </div>
          <div className="text-gray60 font-normal text-sm leading-[22px]">
            {createdAt.split("T")[0]}
          </div>
        </div>
        <div className="py-4 flex space-x-1 items-center">
          <StarRating
            rating={rating}
            imgClass="w-[15px] h-[15px]"
            starColor="blue"
          />
          <div className="text-xs text-gray60">({rating.toFixed(1)})</div>
        </div>
        <div className="font-normal text-gray60 text-sm leading-[22px] mb-4">
          {content}
        </div>

        {isMine && (
          <div className="flex space-x-4">
            <div className="flex-1"></div>
            <div
              onClick={() =>
                navigate(`/toilet/${toiletId}/comment?commentId=${commentId}`)
              }
              className="cursor-pointer font-normal text-sm leading-[22px] text-gray60"
            >
              수정
            </div>
            <div
              onClick={() => {
                setDeleteState(true);
                dispatch(displayModal());
              }}
              className="cursor-pointer font-normal text-sm leading-[22px] text-gray60"
            >
              삭제
            </div>
          </div>
        )}
      </div>
      {deleteModal ? (
        deleteState ? (
          <Modal
            title="해당 댓글을 삭제하시겠습니까?😮"
            left="취소"
            right="삭제"
            action={deleteHandler}
          />
        ) : null
      ) : null}
    </>
  );
};

export default Comment;
