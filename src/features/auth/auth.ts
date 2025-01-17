import { env } from "@/shared/lib/env";
import { prisma } from "@/shared/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import { compare } from "bcryptjs";
import NextAuth, { CredentialsSignin, NextAuthConfig } from "next-auth";
import Credential from "next-auth/providers/credentials";

export const { handlers, auth } = NextAuth({
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/orgs",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credential({
      name: "credentials",
      credentials: {
        email: { label: "Adresse e-mail", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        if (!email || !password)
          throw new CredentialsSignin("Missing credentials");

        let user = null;
        user = await prisma.user.findUnique({
          where: {
            email: email as string,
          },
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            hashedPassword: true,
            organizationId: true,
          },
        });

        if (!user) {
          throw new CredentialsSignin("Invalid credentials");
        }

        if (!user.hashedPassword)
          throw new CredentialsSignin("Invalid credentials");

        const isMatch = await compare(password as string, user.hashedPassword);

        if (!isMatch) {
          throw new CredentialsSignin("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "database",
  },
  callbacks: {
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.image = token.image as string;
      session.user.role = token.role as UserRole;
      session.user.organizationId = token.organizationId as string;

      return session;
    },
  },
  trustHost: true,
  secret: env.AUTH_SECRET || "default-secret",
} satisfies NextAuthConfig);
