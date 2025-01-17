import { UserRole } from "@prisma/client";
import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface session {
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
      role: UserRole;
      organizationId: string;
    } & DefaultSession["user"];
  }
}
