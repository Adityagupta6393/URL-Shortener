import redisClient from "../config/redis.js";

const DEFAULT_TTL = 60 * 60; // 1 hour

const get = async (key) => {
    return await redisClient.get(key);
};

const set = async (key, value, ttl = DEFAULT_TTL) => {
    await redisClient.set(
        key,
        JSON.stringify(value),
        {
            EX: ttl,
        }
    );
};

const del = async (key) => {
    return await redisClient.del(key);
};

export default {
    get,
    set,
    del,
};