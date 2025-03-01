import { Hero, NavBar } from "@/components";
import Introduction from "@/components/Introduction";
import CoverMaker from "@/components/CoverMaker";
import Contact from "@/components/Contact";
import AboutUs from "@/components/Aboutus";
import Footer from "@/components/Footer";

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
