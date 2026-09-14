import { config } from "dotenv";

config();

const ENV = {
  PORT: process.env.PORT,
  REDIS_URL: process.env.REDIS_URL!,
  MONGOOSE_URL: process.env.MONGOOSE_URL!,
};

export default ENV;
