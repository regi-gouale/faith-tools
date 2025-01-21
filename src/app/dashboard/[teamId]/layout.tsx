"use client";

import SidebarLayout, { SidebarItem } from "@components/layout/sidebar";
import { SelectedTeamSwitcher, useUser } from "@stackframe/stack";
import {
  BadgePercent,
  BarChart4,
  Columns3,
  Globe,
  Settings2,
  ShoppingBag,
  ShoppingCart,
  Users,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ReactNode } from "react";

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
    name: "Tous les membres",
    href: "/members/all",
    icon: ShoppingBag,
    type: "item",
  },
  {
    name: "STAR",
    href: "/members/star",
    icon: Users,
    type: "item",
  },
  {
    name: "Responsables",
    href: "/segments",
    icon: Columns3,
    type: "item",
  },
  {
    type: "label",
    name: "Départements",
  },
  {
    name: "Revenue",
    href: "/revenue",
    icon: BarChart4,
    type: "item",
  },
  {
    name: "Orders",
    href: "/orders",
    icon: ShoppingCart,
    type: "item",
  },
  {
    name: "Discounts",
    href: "/discounts",
    icon: BadgePercent,
    type: "item",
  },
  {
    type: "label",
    name: "Paramètres",
  },
  {
    name: "Configuration",
    href: "/settings",
    icon: Settings2,
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

  // handler/account-settings#profile

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
