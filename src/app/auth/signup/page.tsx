import { auth } from "@/features/auth/lib/auth";
import { registerUser } from "@features/auth/lib/actions";
import { Button } from "@ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/card";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-slate-50 px-4 py-12 dark:bg-slate-800">
      <div className="w-full max-w-3xl space-y-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Créer un compte
            </CardTitle>
            <CardDescription className="text-center py-4 space-y-8">
              Créez un compte pour accéder à notre plateforme incroyable.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-2 mx-auto max-w-3xl p-4">
              <form className="space-y-8" action={registerUser}>
                <div className="grid grid-cols-4 items-center space-x-2">
                  <Label>Nom</Label>
                  <Input
                    placeholder="Jean Dupont"
                    name="name"
                    type="text"
                    className="rounded-lg col-span-3"
                    required
                    aria-required
                  />
                </div>
                <div className="grid grid-cols-4 items-center space-x-2">
                  <Label>E-Mail</Label>
                  <Input
                    placeholder="dupont@mail.com"
                    name="email"
                    type="email"
                    className="rounded-lg col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center space-x-2">
                  <Label>Mot de passe</Label>
                  <Input
                    placeholder="****************"
                    name="password"
                    type="password"
                    className="rounded-lg col-span-3"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Créer mon compte
                </Button>
              </form>
            </div>
          </CardContent>
          <CardFooter>
            <CardDescription className="text-center px-4">
              Vous avez déjà un compte ?{" "}
              <a href="/auth/signin" className="font-semibold text-primary">
                Connectez-vous
              </a>
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
