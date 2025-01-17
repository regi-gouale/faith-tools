import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/card";
import { BarChart, Shield, Zap } from "lucide-react";

const features = [
  {
    title: "Ultra-rapide",
    description:
      "Découvrez une vitesse inégalée avec notre plateforme optimisée.",
    icon: Zap,
  },
  {
    title: "Sécurisé et fiable",
    description:
      "Vos données sont en sécurité avec nos mesures de sécurité à la pointe de la technologie.",
    icon: Shield,
  },
  {
    title: "Analyses avancées",
    description:
      "Obtenez des informations précieuses avec nos outils d'analyse puissants.",
    icon: BarChart,
  },
];

export default function Functionalities() {
  return (
    <section id="functionalities" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Nos fonctionnalités
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-center space-x-4">
                <feature.icon className="mb-2 size-8 text-primary" />
                <CardTitle className="mb-2 h-8 text-primary">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
