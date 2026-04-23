export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#061220]"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0e2540] via-[#061220] to-[#0a1c30]"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#1d7a8a]/10 to-transparent"></div>

      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-96 h-96 rounded-full border border-[#c9a84c]/10 animate-float"></div>
      <div className="absolute top-32 right-32 w-64 h-64 rounded-full border border-[#1d7a8a]/15 animate-float delay-200"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-[#1d7a8a]/5 blur-3xl"></div>

      {/* Diagonal accent line */}
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-[#c9a84c]/20 to-transparent"></div>

      <div className="relative z-10 max-w-7xl  px-6  md:px-[86px] pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-full mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse"></span>
            <span className="text-[#c9a84c] text-xs font-medium tracking-widest uppercase">
              Trusted Since 20+ Years
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className="text-6xl md:text-8xl font-bold text-white leading-none mb-2 animate-fade-up delay-100"
            style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700 }}
          >
            HORIZON
          </h1>
          <h2
            className="text-2xl md:text-4xl font-light tracking-[0.3em] text-[#c9a84c] mb-8 animate-fade-up delay-200"
            style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
          >
            INTEGRATED SOLUTIONS
          </h2>

          {/* Divider */}
          <div className="w-20 h-1 bg-gradient-to-r from-[#c9a84c] to-[#1d7a8a] mb-8 animate-fade-up delay-200"></div>

          {/* Description */}
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mb-10 animate-fade-up delay-300">
            Complete infrastructure, technology & procurement services — specializing in Telecom Towers, CCTV Surveillance, Perimeter Fencing, Fiber Networks & Civil Works.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-16 animate-fade-up delay-400">
            <a
              href="#services"
              className="px-8 py-4 bg-[#c9a84c] text-[#061220] font-bold text-sm tracking-wide rounded hover:bg-[#f0d080] transition-all hover:scale-105"
            >
              Our Services
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-white/20 text-white font-medium text-sm tracking-wide rounded hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all"
            >
              Get In Touch
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-12 animate-fade-up delay-500">
            {[
              { value: '20+', label: 'Years Experience' },
              { value: '8+', label: 'Service Sectors' },
              { value: '7+', label: 'Major Clients' },
              { value: '100%', label: 'On-Time Delivery' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-[#c9a84c]" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
                  {stat.value}
                </div>
                <div className="text-white/50 text-xs tracking-wide uppercase mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-white/20"></div>
      </div>
    </section>
  );
}
