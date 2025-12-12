import redis from "../src/redis";

async function verify() {
  try {
    await redis.set("test_key", "Hello Redis!");
    const value = await redis.get("test_key");
    console.log("Redis verification successful:", value);
    await redis.del("test_key");
    process.exit(0);
  } catch (error) {
    console.error("Redis verification failed:", error);
    process.exit(1);
  }
}

verify();
