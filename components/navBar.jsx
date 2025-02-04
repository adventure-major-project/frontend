'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState,useEffect } from 'react'
import { CustomButton } from '.'
const links=[

  {
    id:1,
    title:"Home",
    url:"/"
  },
  {
    id:2,
    title:"Demo",
    url:"#demo"
  },
  {
    id:3,
    title:"Contact",
    url:"#contact"
  },
  {
    id:4,
    title:"About",
    url:"#about"
  },
  
];


const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);
  return (
  <div className={`flex items-center justify-between w-full fixed z-50 px-4 py-2 bg-blacklooking transition-all duration-300 ${isScrolled ? 'bg-blacklooking' : 'bg-transparent'}`}>
    <Link href="/"  >
    <Image src="/logo.jpg" alt="logo" width={60} height={10} className="object-contain" />
    </Link>
    <div className='flex justify-center items-center gap-16 text-cream font-bold'>
      {
        links.map((link) => (
          <Link key={link.id} href={link.url}>{link.title}</Link>
        ))
      }
    </div>

      <button onClick={()=>console.log("clicked")} className='text-cream font-bold '>Login</button>
  </div>

  )
}

export default NavBar
