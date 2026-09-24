import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/sections/Footer";
import RegistrationWizard from "@/components/registration/RegistrationWizard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register for GENESIS | Rotaract Club of DIU",
  description:
    "Complete your registration for GENESIS — The Beginning of a New Era. Choose your category: Guest or Club Member.",
};

export default function RegisterPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={{ flex: 1, paddingTop: "clamp(36px, 6vw, 64px)", paddingBottom: "clamp(56px, 8vw, 96px)" }}>
        <div className="container">
          <RegistrationWizard />
        </div>
      </main>
      <Footer />
    </div>
  );
}
