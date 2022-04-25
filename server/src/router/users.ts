import express, { query, Request, Response } from "express";
import { DB } from "../data-source";
import axios from "axios";
import dotenv from "dotenv";
import { User } from "../entity/User";
import jwt from "jsonwebtoken";

dotenv.config();
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  res.sendStatus(200);
});

router.get("/token", async (req: Request, res: Response) => {
  res.sendStatus(200);
});

router.get("/kakao", async (req: Request, res: Response) => {
  // 카카오 OAuth 페이지에서 동의 완료 후 redirect되는 api
  console.log("start");
  const code = req.query?.code;
  if (!code) return res.status(403).json({ message: "oauth code not found" });
  console.log("second");
  try {
    const kakaoTokenRequest = await axios.post(
      `https://kauth.kakao.com/oauth/token`,
      {},
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        params: {
          grant_type: "authorization_code",
          client_id: process.env.KAKAO_CLIENT_ID,
          redirect_uri: process.env.KAKAO_REDIRECT_URI,
          code,
        },
      }
    );

    const { access_token } = kakaoTokenRequest.data;
    const kakaoUserInfoUrl = "https://kapi.kakao.com/v2/user/me";

    const kakaoUserInfoRequest = await axios.get(kakaoUserInfoUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    const kakaoUserInfo = kakaoUserInfoRequest.data;
    const kakaoOauthId = String(kakaoUserInfo.id);
    const kakaoUserEmail = kakaoUserInfo.kakao_account.email;

    // DB에 해당 oauthProvider(KAKAO)와 oauthProviderId 세트가 있는지 확인.
    // 조건 : oauthProvider가 "kakao" + oauthProviderId가 kakaoOauthId 인 레코드가 있는지 없는지 찾는다.
    const queryResult = await DB.manager.findOne(User, {
      where: { oAuthProvider: "kakao", oAuthProviderId: "312" },
    });

    // CASE1) 이미 가입된 유저인 경우 -> JWT.TOKEN 재발급해서 쿠키에 담아서 준다.
    if (queryResult) {
      const payload = { id: queryResult.id };

      const tunaToken = jwt.sign(payload, process.env.JWT_SECRET! as string, {
        expiresIn: "30d",
      });

      res.setHeader("Set-Cookie", `token=${tunaToken}; Path=/`);
      return res.redirect("/");
    }

    return res.json({ message: "login complete" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/google", async (req: Request, res: Response) => {
  res.sendStatus(200);
});

router.post("/logout", async (req: Request, res: Response) => {
  res.sendStatus(200);
});

export default router;
