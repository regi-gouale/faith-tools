"use client";

import { Logo } from "@components/icons/logo";
import { ThemeToggle } from "@components/theme/theme-toggle";
import { Button } from "@ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type NavItemProps = {
  href: string;
  label: string;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: NavItemProps[] = [
    { href: "#functionalities", label: "Fonctionnalités" },
    { href: "#pricing", label: "Tarifs" },
    { href: "#about", label: "À Propos" },
    { href: "#contact", label: "Contact" },
  ];

  const NavItems = () => (
    <>
      {navItems.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="text-sm font-medium hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex justify-evenly p-4">
        <nav className="container mx-auto flex items-center justify-between p-4">
          <Logo />
          <ul className="hidden space-x-6 md:flex">
            <NavItems />
          </ul>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {/* <Button variant="default" size="sm">
              <Link href={stackServerApp.urls.signIn}>Connexion</Link>
            </Button> */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="size-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="mt-4 flex flex-col space-y-4">
                  <NavItems />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
