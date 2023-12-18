import express from "express";
import auth from "../controller/auth";
import subscribes from "../controller/subscribe";

const router = express.Router();

router.post("/", auth, subscribes.addSubscribe);
router.post("/notification", auth, subscribes.sendNotification);

export default router;
