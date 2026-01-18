import { Advantages } from "./_components/advantages";
import { Contact } from "./_components/contact";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { HowItWorks } from "./_components/how-it-works";
import { Plans } from "./_components/plans";
import { TargetAudience } from "./_components/target-audience";
import { SmoothScroll } from "@/components/ui/smooth-scroll";

export default function Home() {
  return (
    <div id="top" className="flex min-h-screen flex-col">
      <SmoothScroll />
      <Header />
      <main id="conteudo" className="flex flex-col">
        <Hero />
        <Advantages />
        <HowItWorks />
        <TargetAudience />
        <Plans />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
