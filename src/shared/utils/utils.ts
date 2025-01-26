import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const saltAndHashPassword = (password: string) => {
//   const rounds = parseInt(env.SALT_ROUNDS, 10);
//   const salt = genSaltSync(rounds);
//   return hashSync(password, salt);
// };
