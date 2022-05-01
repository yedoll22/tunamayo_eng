import express, { NextFunction, Request, Response } from "express";
import { DB } from "../data-source";
import { Toilet } from "../entity/Toilet";
import { Comment } from "../entity/Comment";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { verify } from "crypto";
import { Db } from "typeorm";

dotenv.config();
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const toiletList = await DB.manager.find(Toilet);
    return res.status(200).json(toiletList);
  } catch (err) {
    return res.sendStatus(500);
  }
});

router.get("/:toiletId", async (req: Request, res: Response) => {
  try {
    const { toiletId } = req.params;
    const toiletInfo = await DB.manager.findOne(Toilet, {
      where: { id: Number(toiletId) },
    });
    return res.status(200).json(toiletInfo);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get("/:toiletId/comments", async (req: Request, res: Response) => {
  try {
    const { toiletId } = req.params;
    const commentList = await DB.manager.findOne(Comment, {
      where: { toiletId: Number(toiletId) },
    });
    return res.status(200).json(commentList);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.post("/:toiletId/comments", async (req: Request, res: Response) => {
  const { authorization } = req.headers;
  const toiletId = Number(req.params.toiletId);
  const { content, rating } = req.body;
  try {
    if (!authorization) return res.sendStatus(403);
    const tunaToken = authorization.split(" ")[1];
    // 토큰 검증하기
    const userData: any = jwt.verify(
      tunaToken,
      process.env.JWT_SECRET! as string
    );
    const userId = userData.id;

    await DB.manager.insert(Comment, {
      userId,
      toiletId,
      content,
      rating,
    });
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.patch(
  "/:toiletId/comments/:commentId",
  async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const commentId = Number(req.params.commentId);
    const { content, rating } = req.body;

    try {
      if (!authorization) return res.sendStatus(403);
      // 토큰 검증하기
      console.log(content, rating);

      await DB.manager.update(Comment, commentId, { content, rating });
      return res.sendStatus(200);
    } catch (err) {
      return res.sendStatus(500);
    }
  }
);

router.delete(
  "/:toiletId/comments/:commentId",
  async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const commentId = Number(req.params.commentId);

    try {
      if (!authorization) return res.sendStatus(403);
      // 토큰 검증하기
      await DB.manager.delete(Comment, commentId);
      return res.sendStatus(200);
    } catch (err) {
      return res.sendStatus(500);
    }
  }
);

export default router;
