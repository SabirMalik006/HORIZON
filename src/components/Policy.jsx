import React, { useEffect } from 'react';

const Policy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#0e2540] min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>
          OUR <span className="text-[#c9a84c]">POLICIES</span>
        </h1>

        <div className="space-y-12">
          {/* Terms & Conditions */}
          <section className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-[#c9a84c]/30 transition-colors">
            <h2 className="text-2xl font-bold text-[#c9a84c] mb-4 flex items-center gap-3">
              <span className="text-3xl">📄</span> Terms & Conditions
            </h2>
            <div className="text-white/80 leading-relaxed space-y-4">
              <p>
                Welcome to <strong>Horizon Integrated Solutions</strong> website. By using our services, you agree to follow our terms and policies. Please make sure all information provided by you is correct.
              </p>
              <p>
                We reserve the right to update products, prices, and policies at any time without prior notice. Your continued use of the website following any changes indicates your acceptance of the new terms.
              </p>
            </div>
          </section>

          {/* Shipping Policy */}
          <section className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-[#c9a84c]/30 transition-colors">
            <h2 className="text-2xl font-bold text-[#c9a84c] mb-4 flex items-center gap-3">
              <span className="text-3xl">🚚</span> Shipping Policy
            </h2>
            <div className="text-white/80 leading-relaxed space-y-4">
              <p>
                At <strong>Horizon Integrated Solutions</strong>, we process and ship orders as quickly as possible. Delivery times may vary depending on your location and courier service.
              </p>
              <p>
                Customers will receive order updates after confirmation. If you face any issue with shipping, feel free to contact our support team. We are committed to ensuring your products reach you safely and on time.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-16 text-center">
          <a 
            href="/"
            className="inline-block px-8 py-3 bg-[#c9a84c] text-[#0e2540] font-bold rounded hover:bg-[#b39339] transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Policy;
