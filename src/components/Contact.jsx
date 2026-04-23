import { companyInfo } from '../data/company';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-[#061220]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <p className="text-[#c9a84c] text-xs font-semibold tracking-widest uppercase mb-3">Reach Out</p>
          <h2 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
            CONTACT US
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#1d7a8a] to-[#c9a84c] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              GET IN TOUCH
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center flex-shrink-0">
                  <span>📍</span>
                </div>
                <div>
                  <div className="text-white/40 text-xs uppercase tracking-wide mb-1">Address</div>
                  <div className="text-white">{companyInfo.address}</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center flex-shrink-0">
                  <span>📞</span>
                </div>
                <div>
                  <div className="text-white/40 text-xs uppercase tracking-wide mb-1">Phone</div>
                  <a href={`tel:${companyInfo.phone}`} className="text-white hover:text-[#c9a84c] transition-colors">
                    {companyInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center flex-shrink-0">
                  <span>✉️</span>
                </div>
                <div>
                  <div className="text-white/40 text-xs uppercase tracking-wide mb-1">Email</div>
                  <a href={`mailto:${companyInfo.email}`} className="text-white hover:text-[#c9a84c] transition-colors break-all">
                    {companyInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center flex-shrink-0">
                  <span>🌐</span>
                </div>
                <div>
                  <div className="text-white/40 text-xs uppercase tracking-wide mb-1">Website</div>
                  <span className="text-white">{companyInfo.website}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
              SEND A MESSAGE
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/50 text-xs uppercase tracking-wide block mb-2">Name</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-white/50 text-xs uppercase tracking-wide block mb-2">Phone</label>
                  <input
                    type="tel"
                    placeholder="Your Phone"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-white/50 text-xs uppercase tracking-wide block mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-white/50 text-xs uppercase tracking-wide block mb-2">Service</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/70 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors">
                  <option value="" className="bg-[#0e2540]">Select a Service</option>
                  <option className="bg-[#0e2540]">CCTV & Surveillance</option>
                  <option className="bg-[#0e2540]">Telecom Towers</option>
                  <option className="bg-[#0e2540]">Fiber Cable Laying</option>
                  <option className="bg-[#0e2540]">Construction Materials</option>
                  <option className="bg-[#0e2540]">Maintenance & Renovation</option>
                  <option className="bg-[#0e2540]">Procurement</option>
                  <option className="bg-[#0e2540]">Smart Infrastructure</option>
                  <option className="bg-[#0e2540]">Other</option>
                </select>
              </div>
              <div>
                <label className="text-white/50 text-xs uppercase tracking-wide block mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="Your Message..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors resize-none"
                />
              </div>
              <button className="w-full py-4 bg-[#c9a84c] text-[#061220] font-bold text-sm tracking-wide rounded-lg hover:bg-[#f0d080] transition-colors">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
