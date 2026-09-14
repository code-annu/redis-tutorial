import { Request, Response, Router } from "express";
import redisClient from "../../core/redis.client";
import { otpKey } from "../../core/key";

const otpLoginRouter = Router();

otpLoginRouter.post("/otp/send", async (req: Request, res: Response) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await redisClient.set(otpKey(phone), otp, "EX", 30);
  res.json({ success: true, message: "OTP sent successfully", otp });
});

otpLoginRouter.post("/otp/verify", async (req: Request, res: Response) => {
  const { phone, otp } = req.body;

  const storedOtp = await redisClient.get(otpKey(phone));

  if (!storedOtp || storedOtp !== otp) {
    return res.json({ success: false, message: "Invalid OTP" });
  }

  await redisClient.del(otpKey(phone));

  res.json({ success: true, message: "OTP verified successfully" });
});

export default otpLoginRouter;
