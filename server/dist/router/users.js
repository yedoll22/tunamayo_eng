"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../entity/User");
dotenv_1.default.config();
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.sendStatus(200);
}));
router.get("/token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.sendStatus(200);
}));
router.get("/kakao", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // 카카오 OAuth 페이지에서 동의 완료 후 redirect되는 api
    console.log("start");
    const code = (_a = req.query) === null || _a === void 0 ? void 0 : _a.code;
    if (!code)
        return res.status(403).json({ message: "oauth code not found" });
    console.log("second");
    try {
        const kakaoTokenRequest = yield axios_1.default.post(`https://kauth.kakao.com/oauth/token`, {}, {
            headers: {
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            params: {
                grant_type: "authorization_code",
                client_id: process.env.KAKAO_CLIENT_ID,
                redirect_uri: process.env.KAKAO_REDIRECT_URI,
                code,
            },
        });
        const { access_token } = kakaoTokenRequest.data;
        const kakaoUserInfoUrl = "https://kapi.kakao.com/v2/user/me";
        const kakaoUserInfoRequest = yield axios_1.default.get(kakaoUserInfoUrl, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
        });
        const kakaoUserInfo = kakaoUserInfoRequest.data;
        const kakaoOauthId = String(kakaoUserInfo.id);
        const kakaoUserEmail = kakaoUserInfo.kakao_account.email;
        // DB에 해당 oauthProvider(KAKAO)와 oauthProviderId 세트가 있는지 확인.
        // 조건 : oauthProvider가 "kakao" + oauthProviderId가 2216795310 인 레코드가 있는지 없는지 찾는다.
        // const resultSteven = await AppDataSource.manager.findOneBy(User, {
        //   oAuthProvider: "kakao",
        // });
        // console.log("steven-test:", resultSteven);
        const result = User_1.User.count();
        console.log("afefae", result);
        return res.json({ message: "login complete" });
    }
    catch (err) {
        console.log(err);
    }
}));
router.post("/google", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.sendStatus(200);
}));
router.post("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.sendStatus(200);
}));
exports.default = router;
//# sourceMappingURL=users.js.map