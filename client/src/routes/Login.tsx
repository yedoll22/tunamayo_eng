const Login = () => {
  const kakaourl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
  return (
    <div>
      <a href={kakaourl}>카카오 로그인</a>
    </div>
  );
};

export default Login;
