
import { Hero } from "@/components";
import Introduction from "@/components/Introduction";
import CoverMaker from "@/components/CoverMaker";
import Contact from "@/components/Contact";
import AboutUs from "@/components/Aboutus";

import ExptSetupPage from "@/components/ExptSetupPage";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <Introduction />
      <CoverMaker />
      <ExptSetupPage />
      <Contact />
      <AboutUs />
    </main>
  );
}
