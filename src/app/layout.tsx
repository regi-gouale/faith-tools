import { stackServerApp } from "@/features/auth/stack";
import { Footer } from "@/shared/components/landing/footer";
import { ThemeProvider } from "@/shared/components/theme/theme-provider";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { Toaster } from "@ui/sonner";
import { TailwindIndicator } from "@ui/tailwind-indicator";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Faith Tools - Gestion des églises facile",
  description: "Gérez votre église facilement avec Faith Tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StackProvider app={stackServerApp} lang="fr-FR">
            <StackTheme>{children}</StackTheme>
          </StackProvider>
          <Footer
            builtBy="Régi GOUALE"
            builtByLink="https://faith.tools"
            githubLink="https://github.com/regi-gouale/faith-tools.git"
            twitterLink="https://x.com/faithtools"
            linkedinLink="https://linkedin.com/company/faithtools"
          />
          <Toaster />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
