import Image from "next/image";
import Link from "next/link";



const Footer = () => (
  <footer  className='flex flex-col text-black bg-blacklooking'>
    <div className='flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-6'>
      <div className='flex gap-6'>
        <Image src='/logo.jpg' alt='logo' width={50} height={18} className='object-contain' />
        <p className={`text-cream`}>
          AdVenture 2025 <br />
          All Rights Reserved &copy;
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;