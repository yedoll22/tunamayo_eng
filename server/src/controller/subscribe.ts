import { Response } from "express";
import { CustomRequest } from "../type/middleware";
import { DB } from "../data-source";
import { Subscribe } from "../entity/Subscribe";
import webPush from 'web-push';

const subscribeController = {
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

      const notificationPayload = JSON.stringify({ title: 'Snackpot' });
      const sendNotifications = subscriptions.map(sub => {
        const pushConfig = {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256Key,
            auth: sub.authKey
          }
        };

        return webPush.sendNotification(pushConfig, notificationPayload);
    });

      await Promise.all(sendNotifications);

      return res.sendStatus(201);
    } catch (err) {
      return res.sendStatus(500);
    }
  },
};

export default subscribeController;
