import { Request, Response, Router } from "express";
import redisClient from "../core/redis.client";

const bannerRouter = Router();

const BANNER_KEY = "app:banner";

bannerRouter.post("/", async (req: Request, res: Response) => {
  const { data } = req.body;
  await redisClient.set(BANNER_KEY, data || "Banner of app");
  res.status(200).json({ success: true });
});

bannerRouter.get("/", async (req: Request, res: Response) => {
  const data = await redisClient.get(BANNER_KEY);
  res.status(200).json({ success: true, data });
});

bannerRouter.get("/exists", async (req: Request, res: Response) => {
  const data = await redisClient.exists(BANNER_KEY);
  res.status(200).json({ success: true, data: Boolean(data) });
});

bannerRouter.delete("/", async (req: Request, res: Response) => {
  await redisClient.del(BANNER_KEY);
  res.status(200).json({ success: true });
});

bannerRouter.post("/", async (req: Request, res: Response) => {
  const data = req.body;
  await redisClient.set(BANNER_KEY, data || "Banner of app");
  res.status(200).json({ success: true });
});

export default bannerRouter;
