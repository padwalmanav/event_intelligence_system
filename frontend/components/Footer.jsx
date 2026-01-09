import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0A0F1F] border-t border-white/5 text-gray-300">
      <div className="max-w-screen-2xl mx-auto px-6 py-16">

        {/* ================= TOP GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-14 items-start">

          {/* BRAND & CONTACT */}
          <div className="space-y-5 justify-self-center">
            <h2 className="text-3xl text-white">
              <span className="text-xl">my</span>Events
              <span className="text-xl font-bold text-blue-400">IQ</span>
            </h2>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Intelligence, not guesswork. Make smarter event decisions with
              deep insights, ROI metrics, and GTM intelligence.
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <span>📧</span>
                <span>myeventsiq@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <span>📍</span>
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="justify-self-center text-center">
            <h3 className="text-white font-semibold mb-5 text-lg">Quick Links</h3>
            <ul className="space-y-3 text-lg">
              <li><NavLink to="/" className="hover:text-blue-400">Home</NavLink></li>
              <li><NavLink to="/events" className="hover:text-blue-400">Events</NavLink></li>
              <li><NavLink to="/pricing" className="hover:text-blue-400">Pricing</NavLink></li>
              <li><NavLink to="/features" className="hover:text-blue-400">Features</NavLink></li>
            </ul>
          </div>


          {/* COMPANY */}
          <div className="justify-self-center text-center">
            <h3 className="text-white font-semibold mb-5 text-lg">Company</h3>
            <ul className="space-y-3 text-lg">
              <li><NavLink to="/about" className="hover:text-blue-400">About</NavLink></li>
              <li><NavLink to="/blog" className="hover:text-blue-400">Blog</NavLink></li>
              <li><NavLink to="/careers" className="hover:text-blue-400">Careers</NavLink></li>
              <li><NavLink to="/partners" className="hover:text-blue-400">Partners</NavLink></li>
            </ul>
          </div>

        </div>

        {/* ================= NEWSLETTER ROW ================= */}
        <div className="mt-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#0d1117] border border-white/10 rounded-2xl p-8">
              <h3 className="text-white font-semibold text-xl mb-2">
                Stay Updated
              </h3>

              <p className="text-sm text-gray-400 mb-6 max-w-xl">
                Get insights, GTM strategies, and event intelligence delivered to your inbox.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="
                    flex-1 min-w-0 px-5 py-3 rounded-lg
                    bg-white/10 text-white text-sm
                    placeholder-gray-400
                    border border-white/10
                    focus:outline-none focus:ring-2 focus:ring-blue-400/50
                  "
                />
                <button
                  className="
                    px-6 py-3 rounded-lg
                    bg-blue-500 text-white text-sm font-semibold
                    hover:bg-blue-600 transition-all
                    shrink-0
                  "
                >
                  Subscribe
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>


        {/* ================= BOTTOM BAR ================= */}
        <div className="mt-20 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <span>© {new Date().getFullYear()} myEventsIQ. All rights reserved.</span>

          <div className="flex gap-6">
            <NavLink to="/privacy" className="hover:text-blue-400">Privacy</NavLink>
            <NavLink to="/terms" className="hover:text-blue-400">Terms</NavLink>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
