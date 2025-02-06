
import { Footer } from "@/components";
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
      
        {children}
        <Footer />
      </body>
    </html>
  );
}
