import { PrismaClient } from "../prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import redis from "./redis";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL || "",
});
const prisma = new PrismaClient({
  log: ["error", "query"],
  errorFormat: "pretty",
  adapter,
});

export default prisma;
export { redis };
