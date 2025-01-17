import About from "@/shared/components/landing/about";
import Contact from "@/shared/components/landing/contact";
import Functionalities from "@/shared/components/landing/functionalities";
import Hero from "@/shared/components/landing/hero";
import Pricing from "@/shared/components/landing/pricing";
import Navbar from "@/shared/components/layout/navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Functionalities />
        <Pricing />
        <About />
        <Contact />
      </main>
    </div>
  );
}
