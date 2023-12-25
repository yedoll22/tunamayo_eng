import DrawerHeader from "../components/common/DrawerHeader";
import Loading from "../components/common/Loading";
import Modal from "../components/common/Modal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { displayModal, hideModal } from "../slices/modalSlice";
import { useUserInfoQuery } from "../api/user";
import { useIssueSubscriptionsMutation } from "../api/subscribe";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const modal = useSelector<RootState>((state) => state.modal.value);

  const [subscribtionResponseMessage, setSubscribtionResponseMessage] =
    useState("");
  const userInfo = useUserInfoQuery();

  const issueSubscriptionsMutation = useIssueSubscriptionsMutation({
    handleSuccess: () => {
      setSubscribtionResponseMessage("알림 전송에 성공했습니다!");
      dispatch(displayModal());
    },
    handleError: () => {
      setSubscribtionResponseMessage(
        "알림 전송에 실패했습니다. 잠시후 다시 시도해주세요."
      );
      dispatch(displayModal());
    },
  });

  useEffect(() => {
    if (userInfo.isError) dispatch(displayModal());
  }, [userInfo, dispatch]);

  return (
    <>
      {userInfo.isLoading ? (
        <Loading content="관리자 확인중.." />
      ) : (
        <div className="relative">
          <>
            <DrawerHeader title="관리자 페이지" isAdmin={true} />
            {modal ? null : (
              <>
                <div
                  onClick={() => navigate("/admin/reports?type=report")}
                  className="cursor-pointer py-9 text-center border-b border-gray20 text-base font-normal leading-[26px] text-tnBlack"
                >
                  제보 리스트
                </div>
                <div
                  onClick={() => navigate("/admin/reports?type=inquiry")}
                  className="cursor-pointer py-9 text-center border-b border-gray20 text-base font-normal leading-[26px] text-tnBlack"
                >
                  문의 리스트
                </div>

                <div
                  onClick={() => {
                    issueSubscriptionsMutation.mutate();
                  }}
                  className="py-36 text-center cursor-pointer hover:text-#1890FF"
                >
                  알림 발송 테스트
                </div>
              </>
            )}
          </>
        </div>
      )}

      {modal && userInfo.isError && (
        <Modal
          title="관리자만 접근이 가능합니다."
          action={() => navigate("/", { replace: true })}
          oneButton="확인"
        />
      )}

      {modal && !!subscribtionResponseMessage && (
        <Modal
          title={subscribtionResponseMessage}
          action={() => {
            dispatch(hideModal());
            setSubscribtionResponseMessage("");
          }}
          oneButton="확인"
        />
      )}
    </>
  );
};

export default Admin;
