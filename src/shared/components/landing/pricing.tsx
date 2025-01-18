import { Button } from "@ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/card";

const plans = [
  {
    name: "Basique",
    price: "Gratuit",
    description: "Parfait pour les particuliers",
    features: ["1 utilisateur", "10 projets", "Support basique"],
  },
  {
    name: "Pro",
    price: "19,99 € / Utilisateur",
    description: "Idéal pour les petites équipes",
    features: ["10 utilisateurs", "Projets illimités", "Support prioritaire"],
  },
  {
    name: "Entreprise",
    price: "Personnalisé",
    description: "Pour les grandes organisations",
    features: ["Utilisateurs illimités", "Projets illimités", "Support dédié"],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-slate-50 py-20 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">Pricing Plans</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Card key={index} className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-3xl font-bold">{plan.price}</p>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg
                        className="mr-2 h-5 w-5 text-green-500"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Choisir ce plan</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
