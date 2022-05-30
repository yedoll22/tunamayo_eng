import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../lib/customAxios";
import { getQueryString } from "../lib/utils";

const SignUp = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>("");
  const [nicknameMessage, setNicknameMessage] = useState<string>("");
  const [signupErrorMessage, setSignupErrorMessage] = useState<string>("");
  const [isNickname, setIsNickname] = useState<boolean>(false);
  const oAuthProvider = getQueryString(0);
  const oAuthId = getQueryString(1);
  const email = getQueryString(2);
  const redirect = getQueryString(3);

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nicknameRegex = /^[가-힣]{2,8}$/;
    const currentNickname = e.currentTarget.value;
    setNickname(currentNickname);

    if (!nicknameRegex.test(currentNickname)) {
      setNicknameMessage("닉네임은 공백없이 2~8자 국문으로 설정 가능합니다.");
      setIsNickname(false);
    } else {
      setNicknameMessage("사용가능한 닉네임을 입력하셨습니다");
      setIsNickname(true);
    }
  };

  const nicknameInputClass = () => {
    const defaultClass =
      "pl-4 box-border border-2 rounded-lg text-base font-normal w-full h-12 focus:outline-none";
    if (isNickname && nickname.length)
      return defaultClass + " border-tnBlue focus:border-tnBlue";
    else if (!isNickname && nickname.length)
      return defaultClass + " border-tnRed focus:border-2";
    else if (!isNickname && !nickname.length)
      return defaultClass + " border-gray20 focus:border-tnBlue";
    else return defaultClass + " border-gray20 focus:border-tnBlue";
  };

  const signUpRequest = () => {
    customAxios
      .post("/users/signup", {
        nickname,
        email,
        oAuthProvider,
        oAuthId,
      })
      .then((res) => {
        if (res.status === 201) navigate(redirect, { replace: true });
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setSignupErrorMessage("이미 사용 중인 닉네임입니다.");
        }
      });
  };

  return (
    <>
      <div className="pt-[128px] flex flex-col">
        <div className="pl-8 pb-8 font-normal font-sans not-italic text-2xl text-[#222222] leading-[38px]">
          닉네임 입력하고
          <br />
          1초만에 화장실 찾기
        </div>
        <div className="mx-4 relative mb-[129px]">
          <input
            value={nickname}
            onChange={onChangeNickname}
            className={nicknameInputClass()}
            placeholder="닉네임을 입력하세요."
          />
          {nickname.length > 0 ? (
            <img
              onClick={() => {
                setNickname("");
                setSignupErrorMessage("");
              }}
              className="cursor-pointer absolute right-3 top-3.5 z-10"
              src="/images/common/delete.svg"
              alt="clear-button"
            />
          ) : null}
          {signupErrorMessage ===
          "이미 사용 중인 닉네임입니다." ? null : nickname.length ? (
            <span
              className={
                isNickname
                  ? "pl-2 text-base font-normal text-tnBlue"
                  : "pl-2 text-base font-normal text-tnRed"
              }
            >
              {nicknameMessage}
            </span>
          ) : null}
          {signupErrorMessage === "이미 사용 중인 닉네임입니다." ? (
            <div className="pt-1 pl-2 text-base font-normal text-tnRed">
              {signupErrorMessage}
            </div>
          ) : null}
        </div>
        <div className="px-4">
          <button
            className="text-[#222222] text-base leading-[26px] bg-tnBlue rounded-lg font-bold h-12 py-[11px] w-full"
            onClick={signUpRequest}
          >
            시작하기
          </button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
