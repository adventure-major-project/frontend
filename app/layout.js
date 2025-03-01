import "./globals.css";
import Wrapper from "./wrapper";

export const metadata = {
  title: "AdVenture",
  description: "AdVenture is a platform for creating and sharing interactive advertisement posters using AI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className='relative'
      >
        <Wrapper>
          {children}
        </Wrapper>
      </body>
    </html>
  );
}