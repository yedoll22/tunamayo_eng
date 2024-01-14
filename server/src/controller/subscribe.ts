import { Response } from "express";
import { CustomRequest } from "../type/middleware";
import { DB } from "../data-source";
import { Subscribe } from "../entity/Subscribe";
import webPush from 'web-push';

// 알쓸개솔-서버 구독 컨트롤러 수정
const subscribeController = {
  // 구독 추가
  addSubscribe: async (req: CustomRequest, res: Response) => {
    const userId = req.userId;
    const { expirationTime, p256Key, authKey, endpoint } = req.body;
    try {
      await DB.manager.insert(Subscribe, {
        expirationTime,
        p256Key,
        authKey,
        endpoint,
        userId,
      });

      return res.sendStatus(201);
    } catch (err) {
      return res.sendStatus(500);
    }
  },

  // 푸시 알림 발송 수정
  sendNotification: async (req: CustomRequest, res: Response) => {
    try {
      const vapidPublicKey = process.env.VAPID_PUBLIC_KEY as string;
      const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY as string;

      webPush.setVapidDetails(
        'mailto:taero30@gmail.com',
        vapidPublicKey,
        vapidPrivateKey
      );
      
      const subscriptions = await DB.manager.find(Subscribe);

      const sendNotifications = subscriptions.map(sub => {
        const pushConfig = {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256Key,
            auth: sub.authKey
          }
        };
        
        const notificationPayload = "새해복 많이 받으세요.";
        return webPush.sendNotification(pushConfig, notificationPayload);
    });

      const sendResult = await Promise.all(sendNotifications);

      return res.status(200).json({sendResult});
    } catch (err) {
      return res.sendStatus(500);
    }
  },
};

export default subscribeController;
