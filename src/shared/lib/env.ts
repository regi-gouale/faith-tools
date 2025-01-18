import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    AUTH_SECRET: z.string().min(1),
    SALT_ROUNDS: z.string().min(1),
    NODE_ENV: z.enum(["development", "production", "test"]),
  },
  client: {},
  experimental__runtimeEnv: {},
});
