import { Footer } from "@/shared/components/landing/footer";
import { ThemeProvider } from "@/shared/components/theme/theme-provider";
import { cn } from "@/shared/utils/utils";
import { TailwindIndicator } from "@ui/tailwind-indicator";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Faith Tools - Gestion des églises facile",
  description: "Gérez votre église facilement avec Faith Tools.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={cn(
        "min-h-screen bg-background",
        `${geistSans.variable} ${geistMono.variable} font-sans antialiased`
      )}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Footer
          builtBy="Régi GOUALE"
          builtByLink="https://faith.tools"
          githubLink="https://github.com/regi-gouale/faith-tools.git"
          twitterLink="https://x.com/faithtools"
          linkedinLink="https://linkedin.com/company/faithtools"
        />
        <TailwindIndicator />
      </ThemeProvider>
    </div>
  );
}
