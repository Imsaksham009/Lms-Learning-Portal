import { Redis } from "ioredis";

const redisClient = () => {
	if (process.env.REDIS_URL) {
		return process.env.REDIS_URL;
	} else throw new Error("Redis URL  not found!!!");
};

export const redis = new Redis(redisClient());
