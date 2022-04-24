import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.sendStatus(200);
});

router.get("/:toiletId", (req: Request, res: Response) => {
  res.sendStatus(200);
});

router.get("/:toiletId/comments", (req: Request, res: Response) => {
  res.sendStatus(200);
});

router.post("/:toiletId/comments", (req: Request, res: Response) => {
  res.sendStatus(200);
});

router.patch(
  "/:toiletId/comments/:commentId",
  (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

router.delete(
  "/:toiletId/comments/:commentId",
  (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

export default router;
