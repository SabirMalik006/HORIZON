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
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-14 sm:h-11 rounded-md flex items-center justify-center overflow-hidden">
            <img 
              src="/pp.jpeg" 
              alt="Horizon Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-white font-bold text-base sm:text-xl leading-none tracking-wider" style={{fontFamily:'Barlow Condensed, sans-serif'}}>
              HORIZON
            </div>
            <div className="text-[#c9a84c] text-[9px] sm:text-sm tracking-widest leading-none mt-2 sm:mt-1">
              INTEGRATED SOLUTIONS
            </div>
          </div>
        </a>

        {/* Desktop Links - Hidden on tablet (md) and below */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link text-white/80 hover:text-white text-sm sm:text-lg font-medium tracking-wide transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 xl:ml-4 px-4 xl:px-5 py-2 bg-[#c9a84c] text-[#0e2540] text-sm font-bold tracking-wide rounded hover:bg-[#f0d080] transition-colors"
          >
            Get Quote
          </a>
        </div>

        {/* Mobile/Tablet Hamburger - Shows on lg and below */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile/Tablet Menu - Center Aligned */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0e2540] border-t border-white/10 px-4 sm:px-6 py-6">
          <div className="flex flex-col items-center justify-center text-center">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/80 hover:text-[#c9a84c] py-3 text-base font-medium transition-colors w-full"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {/* Add Get Quote button in mobile menu */}
            <a
              href="#contact"
              className="mt-4 px-6 py-2.5 bg-[#c9a84c] text-[#0e2540] text-sm font-bold tracking-wide rounded text-center hover:bg-[#f0d080] transition-colors w-full max-w-[200px]"
              onClick={() => setMenuOpen(false)}
            >
              Get Quote
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}