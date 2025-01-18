"use client";

import Logo from "@components/icons/logo";
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

interface NavItemProps {
  href: string;
  label: string;
}

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-evenly">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
          <ul className="hidden md:flex space-x-6">
            <NavItems />
          </ul>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="w-6 h-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-4">
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
