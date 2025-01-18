"use server";

import { prisma } from "@/shared/lib/prisma";
import { saltAndHashPassword } from "@/shared/utils/utils";
import { signIn } from "@features/auth/lib/auth";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";

export const registerUser = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (name && email && password) {
    const hashedPassword = saltAndHashPassword(password);

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      console.error("Cet utilisateur existe déjà");
      throw new Error("Cet utilisateur existe déjà");
    }

    await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    redirect("/dashboard");
  } else {
    console.error("Veuillez remplir tous les champs");
    throw new Error("Veuillez remplir tous les champs");
  }
};

export const loginUser = async (formData: FormData) => {
  const email = formData.get("email") as string | undefined;
  const password = formData.get("password") as string | undefined;

  if (!email || !password) {
    console.error("Missing credentials");
    throw new Error("Missing credentials");
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });
  } catch (error) {
    const someError = error as CredentialsSignin;
    console.error(someError);
    throw new Error("Invalid credentials");
  }
  redirect("/dashboard");
};
