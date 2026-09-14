import express from "express";
import ENV from "./core/env";
import redisClient from "./core/redis.client";
import mongoose from "mongoose";
import bannerRouter from "./modules/banner";
import otpLoginRouter from "./modules/login-otp/login-otp.router";
import userRouter from "./modules/user/user.router";

const app = express();

app.use(express.json());

app.get("/health", async (_req, res) => {
  const redisReply = await redisClient.ping();
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(ENV.MONGOOSE_URL);
  }
  res.json({
    message: "Server is running perfectly",
    redis: redisReply,
    mongoose: mongoose.connection.name,
  });
});

app.use("/banner", bannerRouter);
app.use("/login", otpLoginRouter);
app.use("/user", userRouter);

app.listen(ENV.PORT, () => {
  console.log(`Server is running at: http://localhost:${ENV.PORT}`);
});
