"use client";

import SidebarLayout, { type SidebarItem } from "@components/layout/sidebar";
import { SelectedTeamSwitcher, useUser } from "@stackframe/stack";
import { Globe, HomeIcon, NotepadText, StarsIcon, Users } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { type ReactNode } from "react";

const navigationItems: SidebarItem[] = [
  {
    name: "Tableau de bord",
    href: "/",
    icon: Globe,
    type: "item",
  },
  {
    type: "label",
    name: "Membres",
  },
  {
    name: "Tous",
    href: "/members/all",
    icon: Users,
    type: "item",
  },
  {
    name: "STAR",
    href: "/members/star",
    icon: StarsIcon,
    type: "item",
  },

  {
    type: "label",
    name: "Compte-rendus",
  },
  {
    name: "Entretiens",
    href: "/notes/all",
    icon: NotepadText,
    type: "item",
  },
  // {
  //   name: "Orders",
  //   href: "/orders",
  //   icon: ShoppingCart,
  //   type: "item",
  // },
  // {
  //   name: "Discounts",
  //   href: "/discounts",
  //   icon: BadgePercent,
  //   type: "item",
  // },
  {
    type: "label",
    name: "Départements",
  },
  {
    name: "Accueil",
    href: "/settings",
    icon: HomeIcon,
    type: "item",
  },
];

export default function Layout({ children }: { children: ReactNode }) {
  const params = useParams<{ teamId: string }>();
  const user = useUser({ or: "redirect" });
  const team = user.useTeam(params.teamId);
  const router = useRouter();

  if (!team) {
    router.push("/dashboard");
    return null;
  }

  return (
    <SidebarLayout
      items={navigationItems}
      basePath={`/dashboard/${team.id}`}
      sidebarTop={
        <SelectedTeamSwitcher
          selectedTeam={team}
          urlMap={(team) => `/dashboard/${team.id}`}
        />
      }
      baseBreadcrumb={[
        {
          title: team.displayName,
          href: `/dashboard/${team.id}`,
        },
      ]}
    >
      {children}
    </SidebarLayout>
  );
}
