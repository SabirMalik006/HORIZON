import { services } from '../data/company';

export default function Footer() {
  return (
    <footer className="bg-[#0a1c30] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-gradient-to-br from-[#c9a84c] to-[#f0d080] rounded-sm flex items-center justify-center">
                <span className="text-[#0e2540] font-bold text-sm">H</span>
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-none tracking-wider" style={{fontFamily:'Barlow Condensed, sans-serif'}}>
                  HORIZON
                </div>
                <div className="text-[#c9a84c] text-xs tracking-widest">INTEGRATED SOLUTIONS</div>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Delivering complete infrastructure, technology & procurement services across Pakistan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Quick Links</h4>
            <div className="space-y-2">
              {['Home', 'About', 'Services', 'Clients', 'Why Us', 'Contact'].map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(' ', '-')}`}
                  className="block text-white/40 hover:text-[#c9a84c] text-sm transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Services</h4>
            <div className="space-y-2">
              {services.slice(0, 6).map(s => (
                <div key={s.id} className="text-white/40 text-sm">
                  {s.title}
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-sm mt-0.5">📍</span>
                <span className="text-white/40 text-sm">Icon 2, Business Square, Gulberg Greens, Islamabad</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">📞</span>
                <a href="tel:03215366666" className="text-white/40 hover:text-[#c9a84c] text-sm transition-colors">
                  0321-5366666
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">✉️</span>
                <a href="mailto:info@horizonintegratedsolutions.com" className="text-white/40 hover:text-[#c9a84c] text-sm transition-colors break-all">
                  info@horizonintegratedsolutions.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Horizon Integrated Solutions. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Islamabad, Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}
