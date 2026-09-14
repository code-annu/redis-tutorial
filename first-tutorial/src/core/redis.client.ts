import Redis from "ioredis";
import ENV from "./env";

const redisClient = new Redis(ENV.REDIS_URL);
export default redisClient;
