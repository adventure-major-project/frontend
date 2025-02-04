
import { Footer, NavBar } from "@/components";
import "./globals.css";

export const metadata = {
  title: "AdVenture",
  description: "Designed by AdVenture",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className='relative'
      >
       <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
