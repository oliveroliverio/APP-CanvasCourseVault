import Header from "./sections/Header";
import HeroDemo from "./sections/HeroDemo";
import ProblemBenefits from "./sections/ProblemBenefits";
import HowItWorksAndPilot from "./sections/HowItWorksAndPilot";
import Faq from "./sections/Faq";
import Footer from "./sections/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroDemo />
        <ProblemBenefits />
        <HowItWorksAndPilot />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
