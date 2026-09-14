import { Router, Request, Response } from "express";
import redisClient from "../../core/redis.client";

const queueRouter = Router();

interface QueueJob {
  to: string;
  subject: string | null;
  content: string;
}
const KEY_EMAIL_QUEUE = "queue:email";

queueRouter.post("/send", async (req: Request, res: Response) => {
  const { to, subject, content } = req.body;
  if (!to || !subject || !content) {
    return res.status(400).send("Missing required fields");
  }
  const job: QueueJob = {
    to,
    subject,
    content,
  };
  await redisClient.lpush(KEY_EMAIL_QUEUE, JSON.stringify(job));
  return res.status(200).send("Job added to queue");
});

queueRouter.get("/process", async (req: Request, res: Response) => {
  const job = await redisClient.rpop(KEY_EMAIL_QUEUE);
  if (!job) {
    return res.status(404).send("No job found");
  }
  const jobObj = JSON.parse(job) as QueueJob;

  setTimeout(() => {
    console.log("Job processed", jobObj);
  }, 5000);

  return res.status(200).send("Job sent to background");
});

export default queueRouter;
