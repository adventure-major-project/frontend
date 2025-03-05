import Introduction from "@/components/Introduction";
import CoverMaker from "@/components/CoverMaker";
import Contact from "@/components/Contact";
import AboutUs from "@/components/Aboutus";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

import ExptSetupPage from "@/components/ExptSetupPage";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <Hero />
      <Introduction />
      <CoverMaker />
      <ExptSetupPage />
      <Contact />
      <AboutUs />
      <Footer />
    </main>
  );
}
