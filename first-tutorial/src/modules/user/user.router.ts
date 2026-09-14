import { Router, Request, Response } from "express";
import { userKey } from "../../core/key";
import redisClient from "../../core/redis.client";
const userRouter = Router();

userRouter.post("/", async (req: Request, res: Response) => {
  const { id, fullname, age } = req.body;
  const key = userKey(id);
  await redisClient.hset(key, { id, fullname, age });

  return res.status(200).json({ message: "User created successfully" });
});

userRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const key = userKey(id!.toString());
  const user = await redisClient.hgetall(key);

  if (Object.keys(user).length === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ user });
});

userRouter.patch("/:id/name", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { fullname } = req.body;
  const key = userKey(id!.toString());

  await redisClient.hset(key, { fullname });

  return res.status(200).json({ message: "User updated successfully" });
});

export default userRouter;
