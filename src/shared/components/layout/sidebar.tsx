"use client";

import { cn } from "@/shared/utils/utils";
import { UserButton } from "@stackframe/stack";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@ui/breadcrumb";
import { buttonVariants } from "@ui/button";
import { Separator } from "@ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ui/sheet";
import type { LucideIcon } from "lucide-react";
import { Menu } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function useSegment(basePath: string) {
  const path = usePathname();
  const result = path.slice(basePath.length, path.length);
  return result ? result : "/";
}

type Item = {
  name: React.ReactNode;
  href: string;
  icon: LucideIcon;
  type: "item";
};

type Sep = {
  type: "separator";
};

type Label = {
  name: React.ReactNode;
  type: "label";
};

export type SidebarItem = Item | Sep | Label;

function NavItem(props: {
  item: Item;
  onClick?: () => void;
  basePath: string;
}) {
  const segment = useSegment(props.basePath);
  const selected = segment === props.item.href;

  return (
    <Link
      href={props.basePath + props.item.href}
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        selected && "bg-muted",
        "flex-grow justify-start text-md text-zinc-800 dark:text-zinc-300 px-2"
      )}
      onClick={props.onClick}
      prefetch={true}
    >
      <props.item.icon className="mr-2 size-5" />
      {props.item.name}
    </Link>
  );
}

function SidebarContent(props: {
  onNavigate?: () => void;
  items: SidebarItem[];
  sidebarTop?: React.ReactNode;
  basePath: string;
}) {
  // const path = usePathname();
  // const segment = useSegment(props.basePath);

  return (
    <div className="flex h-full flex-col items-stretch">
      <div className="mr-10 flex h-14 shrink-0 items-center border-b px-2 md:mr-0">
        {props.sidebarTop}
      </div>
      <div className="flex grow flex-col gap-2 overflow-y-auto pt-4">
        {props.items.map((item, index) => {
          if (item.type === "separator") {
            return <Separator key={index} className="my-2" />;
          } else if (item.type === "item") {
            return (
              <div key={index} className="flex px-2">
                <NavItem
                  item={item}
                  onClick={props.onNavigate}
                  basePath={props.basePath}
                />
              </div>
            );
          } else {
            return (
              <div key={index} className="my-2 flex">
                <div className="grow justify-start px-2 text-sm font-medium text-zinc-500">
                  {item.name}
                </div>
              </div>
            );
          }
        })}

        <div className="grow" />
      </div>
    </div>
  );
}

export type HeaderBreadcrumbItem = { title: string; href: string };

function HeaderBreadcrumb(props: {
  items: SidebarItem[];
  baseBreadcrumb?: HeaderBreadcrumbItem[];
  basePath: string;
}) {
  const segment = useSegment(props.basePath);
  // console.log(segment);
  const item = props.items.find(
    (item) => item.type === "item" && item.href === segment
  );
  const title: string | undefined =
    item && item.type === "item" ? (item.name as string) : undefined;

  return (
    <Breadcrumb>
      <BreadcrumbList key={"breadcrumb-list"}>
        {props.baseBreadcrumb?.map((item, index) => (
          <>
            <BreadcrumbItem key={`breadcrumb-${index}`}>
              <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator key={`separator-${index}`} />
          </>
        ))}

        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default function SidebarLayout(props: {
  children?: React.ReactNode;
  baseBreadcrumb?: HeaderBreadcrumbItem[];
  items: SidebarItem[];
  sidebarTop?: React.ReactNode;
  basePath: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="flex w-full">
      <div className="sticky top-0 hidden h-screen w-[240px] flex-col border-r md:flex">
        <SidebarContent
          items={props.items}
          sidebarTop={props.sidebarTop}
          basePath={props.basePath}
        />
      </div>
      <div className="flex w-0 grow flex-col">
        <div className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-white px-4 dark:bg-black md:px-6">
          <div className="hidden md:flex">
            <HeaderBreadcrumb
              baseBreadcrumb={props.baseBreadcrumb}
              basePath={props.basePath}
              items={props.items}
            />
          </div>

          <div className="flex items-center md:hidden">
            <Sheet
              onOpenChange={(open) => setSidebarOpen(open)}
              open={sidebarOpen}
            >
              <SheetTrigger>
                <Menu />
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] p-0">
                <SheetHeader>
                  <SheetTitle></SheetTitle>
                </SheetHeader>
                <SidebarContent
                  onNavigate={() => setSidebarOpen(false)}
                  items={props.items}
                  sidebarTop={props.sidebarTop}
                  basePath={props.basePath}
                />
              </SheetContent>
            </Sheet>

            <div className="ml-4 flex md:hidden">
              <HeaderBreadcrumb
                baseBreadcrumb={props.baseBreadcrumb}
                basePath={props.basePath}
                items={props.items}
              />
            </div>
          </div>

          <UserButton
            colorModeToggle={() =>
              setTheme(resolvedTheme === "light" ? "dark" : "light")
            }
          />
        </div>
        <div className="grow">{props.children}</div>
      </div>
    </div>
  );
}
