'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react' // Import icons

const links = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Demo", url: "#demo" },
  { id: 3, title: "Contact", url: "#contact" },
  { id: 4, title: "About", url: "#about" },
];

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Effect to handle scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle menu function
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className={`fixed w-full z-50 px-4 md:px-8 py-3 flex items-center justify-between transition-all duration-300 
      ${isScrolled ? 'bg-black' : 'bg-transparent'}`}>

      {/* Logo */}
      <Link href="/">
        <Image src="/logo.jpg" alt="logo" width={60} height={60} className="object-contain" />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-16 text-white font-bold text-base md:text-lg">
        {links.map((link) => (
          <Link key={link.id} href={link.url} className="hover:text-gray-300 transition">
            {link.title}
          </Link>
        ))}
      </div>

      {/* Login Button (Desktop) */}
      <button className="hidden md:block text-black font-bold bg-white px-4 py-2 rounded-lg hover:bg-gray-400 hover:text-white transition">
        Login
      </button>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-white" onClick={toggleMenu}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown Menu */}
      <div className={`absolute top-16 left-0 w-full bg-black text-white flex flex-col items-center py-5 space-y-5 text-lg 
        transition-all duration-300 ${menuOpen ? 'transform translate-y-0 opacity-100' : 'transform -translate-y-full opacity-0'} md:hidden`}>
        {links.map((link) => (
          <Link key={link.id} href={link.url} className="hover:text-gray-300 transition" onClick={() => setMenuOpen(false)}>
            {link.title}
          </Link>
        ))}
        <button className="text-white font-bold bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition">
          Login
        </button>
      </div>

    </div>
  );
}

export default NavBar;
