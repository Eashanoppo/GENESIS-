import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/sections/Hero";
import EventIntro from "@/components/sections/EventIntro";
import EventInfo from "@/components/sections/EventInfo";
import SpeakersSection from "@/components/sections/SpeakersSection";
import ThemesSection from "@/components/sections/ThemesSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import EventExperienceProse from "@/components/sections/EventExperienceProse";
import ProgramTimeline from "@/components/sections/ProgramTimeline";
import ClubSection from "@/components/sections/ClubSection";
import RegistrationInfoSection from "@/components/sections/RegistrationInfoSection";
import FAQSection from "@/components/sections/FAQSection";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Hero />
        <EventIntro />
        <EventInfo />
        <SpeakersSection />
        <ThemesSection />
        <ExperienceSection />
        <EventExperienceProse />
        <ProgramTimeline />
        <ClubSection />
        <RegistrationInfoSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
