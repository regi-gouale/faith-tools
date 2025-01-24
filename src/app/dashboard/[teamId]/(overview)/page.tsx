import type { Metadata } from "next";

import { stackServerApp } from "@/features/auth/stack";
import {
  getNumberOfHelpers,
  getNumberOfMembers,
  getNumberOfMembersCreatedThisMonth,
  getNumberOfMyNotes,
  getNumberOfNotes,
} from "@/features/dashboard/actions";
import { Graph } from "@/features/dashboard/graph";
import { RecentNotes } from "@/features/dashboard/recent-notes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/card";
import { NotebookTabs, StarsIcon, UsersRound } from "lucide-react";

export const metadata: Metadata = {
  title: "Tableau de bord",
  description: "Page d'accueil de l'application",
};

export default async function DashboardPage() {
  const user = await stackServerApp.getUser({ or: "redirect" });

  if (!user.selectedTeam) return null;
  const teamId = user.selectedTeam.id;

  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              Vue d'ensemble
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Nombre de membres
                </CardTitle>
                <UsersRound size={16} className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {getNumberOfMembers(teamId)}
                </div>
                <p className="text-xs text-muted-foreground">
                  +{getNumberOfMembersCreatedThisMonth(teamId)} depuis le début
                  du mois
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Nombre de STAR
                </CardTitle>

                <StarsIcon size={16} className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {getNumberOfHelpers(teamId)}
                </div>
                {/* <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Entretiens
                </CardTitle>
                <NotebookTabs size={16} className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {getNumberOfNotes(teamId)}
                </div>
                {/* <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Mes entretiens
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="size-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {getNumberOfMyNotes(user.id, teamId)}
                </div>
                {/* <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p> */}
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Moyenne participations aux cultes</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Graph />
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Compte-rendu récents</CardTitle>
                <CardDescription>
                  Il y a eu 4567 compte-rendus ce mois.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentNotes />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
