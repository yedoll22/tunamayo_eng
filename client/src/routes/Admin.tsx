import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DrawerHeader from "../components/DrawerHeader";
import Modal from "../components/Modal";
import { customAxios } from "../lib/customAxios";
import { displayModal } from "../slices/modalSlice";
import { RootState } from "../store/store";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modal = useSelector<RootState>((state) => state.modal.value);

  useEffect(() => {
    customAxios.get("/users").then((res) => {
      if (!res.data.userInfo.isAdmin) {
        dispatch(displayModal());
      }
    });
  }, []);

  return (
    <>
      <div className="relative">
        <>
          <DrawerHeader title="관리자 페이지" isAdmin={true} />
          {modal && (
            <Modal
              title="관리자만 접근이 가능합니다."
              action={() => navigate("/", { replace: true })}
              oneButton="확인"
            />
          )}

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
            </>
          )}
        </>
      </div>
    </>
  );
};

export default Admin;
