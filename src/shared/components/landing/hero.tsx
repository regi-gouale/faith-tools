import { Button } from "@ui/button";
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
            <Link href="/auth/signup">S'inscrire</Link>
          </Button>
          <Button size="lg" variant="secondary">
            <Link href="/auth/signin">Se connecter</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
