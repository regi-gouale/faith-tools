import { stackServerApp } from "@/features/auth/stack";
import About from "@/shared/components/landing/about";
import Contact from "@/shared/components/landing/contact";
import Functionalities from "@/shared/components/landing/functionalities";
import Hero from "@/shared/components/landing/hero";
import Navbar from "@/shared/components/landing/navbar";
import Pricing from "@/shared/components/landing/pricing";

export default async function HomePage() {
  const project = await stackServerApp.getProject();
  if (!project.config.clientTeamCreationEnabled) {
    return (
      <div className="flex min-h-96 w-full items-center justify-center">
        <div className="max-w-xl gap-4">
          <p className="text-xl font-bold">Setup Required</p>
          <p className="mx-auto text-justify">
            {
              "Pour commencer à utiliser ce projet, veuillez activer la création d'équipe côté client dans le tableau de bord Stack Auth (Projet > Paramètres de l'équipe). Ce message disparaîtra une fois la fonctionnalité activée."
            }
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Functionalities />
        <Pricing />
        <About />
        <Contact />
      </main>
    </div>
  );
}
