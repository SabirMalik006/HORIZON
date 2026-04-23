import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Clients', href: '#clients' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0e2540] shadow-2xl py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-[#c9a84c] to-[#f0d080] rounded-sm flex items-center justify-center">
            <span className="text-[#0e2540] font-bold text-sm">H</span>
          </div>
          <div>
            <div className="text-white font-bold text-lg leading-none tracking-wider" style={{fontFamily:'Barlow Condensed, sans-serif'}}>
              HORIZON
            </div>
            <div className="text-[#c9a84c] text-xs tracking-widest leading-none">
              INTEGRATED SOLUTIONS
            </div>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link text-white/80 hover:text-white text-sm font-medium tracking-wide transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-4 px-5 py-2 bg-[#c9a84c] text-[#0e2540] text-sm font-bold tracking-wide rounded hover:bg-[#f0d080] transition-colors"
          >
            Get Quote
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0e2540] border-t border-white/10 px-6 py-4">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="block text-white/80 hover:text-[#c9a84c] py-2 text-sm font-medium transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
