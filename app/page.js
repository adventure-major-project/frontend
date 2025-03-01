import Introduction from "@/components/Introduction";
import CoverMaker from "@/components/CoverMaker";
import Contact from "@/components/Contact";
import AboutUs from "@/components/Aboutus";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";

import ExptSetupPage from "@/components/ExptSetupPage";

export default function Home() {
  return (
    <main className="">
      <NavBar />
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
