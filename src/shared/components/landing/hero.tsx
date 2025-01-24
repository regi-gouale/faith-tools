import { stackServerApp } from "@/features/auth/stack";
import { Button } from "@ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="bg-gradient-to-b from-slate-50 to-white py-24 dark:from-slate-800 dark:to-background"
    >
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Bienvenue sur notre plateforme incroyable
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
          Découvrez la puissance de notre solution innovante qui transforme
          votre façon de gérer votre église.
        </p>
        <div className="flex justify-center space-x-8">
          <Button size="lg" variant="default">
            <Link href={stackServerApp.urls.signUp}>S'inscrire</Link>
          </Button>
          <Button size="lg" variant="secondary">
            <Link href={stackServerApp.urls.signIn}>Se connecter</Link>
          </Button>
        </div>
        <div className="mt-8 flex items-center justify-center">
          <Image
            src={"/dashboard.png"}
            alt={"Hero image"}
            width={1000}
            height={200}
            className="rounded-xl border shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
