import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.sendStatus(200);
});

router.get("/token", (req: Request, res: Response) => {
  res.sendStatus(200);
});

router.post("/kakao", (req: Request, res: Response) => {
  res.sendStatus(200);
});

router.post("/google", (req: Request, res: Response) => {
  res.sendStatus(200);
});

router.post("/logout", (req: Request, res: Response) => {
  res.sendStatus(200);
});

export default router;
