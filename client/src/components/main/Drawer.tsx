import Modal from "../common/Modal";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { displayModal, hideModal } from "../../slices/modalSlice";
import { useLogoutQuery, useUserInfoQuery } from "../../api/user";
import { DrawerProps } from "../../types/common";

const Drawer = ({ drawer, drawerClose }: DrawerProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutModal = useSelector<RootState>((state) => state.modal.value);
  const [logoutState, setLogoutState] = useState<boolean>(false);

  const promptRef = useRef<any>(null);

  const logout = useLogoutQuery();
  const userInfo = useUserInfoQuery();

  const logoutRequest = async () => {
    logout.mutate(
      {},
      {
        onSuccess: () => {
          dispatch(hideModal());
          window.location.reload();
        },
      }
    );
  };

  const drawerClass = () => {
    const defaultClass =
      "absolute top-0 left-0 z-50 w-[212px] h-full bg-white pl-4 pr-[17px] pt-[9px] pb-10 flex flex-col ";
    if (drawerClose) return defaultClass + "animate-drawPopDown";
    else return defaultClass + "animate-drawPopUp";
  };

  // 알쓸개솔-deferredPrompt
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      promptRef.current = event;
    });
  }, []);

  return (
    <>
      {logoutModal ? (
        logoutState ? (
          <Modal
            title="로그아웃 하시겠습니까?"
            left="취소"
            right="로그아웃"
            action={logoutRequest}
          />
        ) : null
      ) : null}

      {drawer ? (
        <div className={drawerClass()}>
          <div
            onClick={() => {
              userInfo?.data
                ? navigate(`/profile?nickname=${userInfo?.data?.nickname}`)
                : navigate("/login");
            }}
            className="flex items-center justify-between mb-[55px] cursor-pointer"
          >
            <div className="flex items-center cursor-pointer">
              <div className="rounded-full mr-2 w-11 h-11 bg-[#FEFEFE] shadow-search flex items-center justify-center">
                <img src="/images/main/profile-icon.svg" alt="profile-icon" />
              </div>
              <div className="font-normal text-sm leading-[22px] text-tnBlack">
                {userInfo?.data
                  ? userInfo?.data?.nickname
                  : "로그인이 필요합니다"}
              </div>
            </div>
            <img src="/images/main/right-arrow.svg" alt="right-arrow" />
          </div>

          <div className="flex-1 pl-2 font-normal text-base leading-[26px] text-tnBlack space-y-[60px]">
            <div
              className="cursor-pointer"
              onClick={() => {
                userInfo?.data
                  ? navigate("/my/comments")
                  : dispatch(displayModal());
              }}
            >
              내가 쓴 리뷰
            </div>

            <div
              className="cursor-pointer"
              onClick={() => {
                userInfo?.data
                  ? navigate("/report?type=report")
                  : dispatch(displayModal());
              }}
            >
              화장실 제보하기
            </div>

            <div
              className="cursor-pointer"
              onClick={() => {
                userInfo?.data
                  ? navigate("/report?type=inquiry")
                  : dispatch(displayModal());
              }}
            >
              1:1 문의
            </div>

            <div onClick={() => navigate("/policy")} className="cursor-pointer">
              버전정보
            </div>

            <div
              onClick={() => {
                if (!promptRef || !promptRef.current) return;
                promptRef.current.prompt();
              }}
              className="cursor-pointer"
            >
              앱 설치하기
            </div>

            {userInfo?.data?.isAdmin ? (
              <div
                className="cursor-pointer"
                onClick={() => {
                  navigate("/admin");
                }}
              >
                관리자 페이지
              </div>
            ) : null}
          </div>

          <div
            onClick={() => {
              if (userInfo?.data) {
                setLogoutState(true);
                dispatch(displayModal());
                return;
              } else navigate("/login");
            }}
            className="text-gray40 text-center font-normal text-base leading-[26px] w-full cursor-pointer"
          >
            {userInfo?.data ? "로그아웃" : "로그인"}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Drawer;
