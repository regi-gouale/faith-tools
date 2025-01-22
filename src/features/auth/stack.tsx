import "server-only";

import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  urls: {
    afterSignIn: process.env.NEXT_PUBLIC_AFTER_SIGN_IN_URL ?? "/dashboard",
    afterSignOut: process.env.NEXT_PUBLIC_AFTER_SIGN_OUT_URL ?? "/",
  },
});
