import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const location = useLocation();
  const [nickname, setNickname] = useState<string>("");
  const queryString: string = location.search;
  const oAuthProvider: string = queryString.split("&")[0].split("=")[1];
  const oAtuhId: string = queryString.split("&")[1].split("=")[1];
  const email: string = queryString.split("&")[2].split("=")[1];

  const signUpRequest = async () => {
    await axios
      .post("http://localhost:8080/users/signup", {
        nickname,
        email,
        oAuthProvider,
        oAtuhId,
      })
      .then(console.log);
  };

  return (
    <>
      <div>Test For Signup API</div>
      <input
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        type="text"
      />
      <button onClick={signUpRequest}>submit</button>
    </>
  );
};

export default SignUp;
