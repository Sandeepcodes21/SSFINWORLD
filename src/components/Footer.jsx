import React from "react";
import {
  Car,
  Phone,
  Mail,
  PhoneCall,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const nav = document.querySelector("nav");
      const navHeight = nav ? nav.offsetHeight : 80;
      const rect = section.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const sectionPosition = rect.top + scrollTop - navHeight;

      window.scrollTo({
        top: Math.max(0, sectionPosition),
        behavior: "smooth",
      });
    }
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToSection(sectionId);
  };

  return (
    <footer
      id="about"
      className="bg-[#15130f] border-t border-white/10 pt-16 pb-8 px-6 md:px-10 relative z-1"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-12">
          <div className="max-w-[360px]">
            <div
              className="flex items-center gap-3 mb-4 cursor-pointer"
              onClick={(e) => handleNavClick(e, "home")}
            >
              <div className="w-9 h-9 bg-gradient-to-br from-[#e89c3e] to-[#f5b800] rounded-xl flex items-center justify-center text-[#0c0b0a] font-extrabold text-sm shadow-lg shadow-[#e89c3e]/40">
                <Car className="w-4 h-4" />
              </div>
              <div className="font-syne font-extrabold text-xl tracking-tight text-[#f4ede0]">
                SSFINWORLD <span className="text-[#e89c3e]">CarHub</span>
              </div>
            </div>
            <p className="text-[#8a7f6e] text-sm leading-relaxed mb-4">
              Premium used car marketplace with verified listings, multi-image
              galleries, aur transparent pricing. Apni car bechein ya kharidein
              — sab kuch ek hi jagah.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-[#1d1a14] border border-white/10 rounded-lg flex items-center justify-center text-[#8a7f6e] hover:text-[#e89c3e] hover:border-[#e89c3e] transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-[#1d1a14] border border-white/10 rounded-lg flex items-center justify-center text-[#8a7f6e] hover:text-[#e89c3e] hover:border-[#e89c3e] transition-all duration-300"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-[#1d1a14] border border-white/10 rounded-lg flex items-center justify-center text-[#8a7f6e] hover:text-[#e89c3e] hover:border-[#e89c3e] transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-[#1d1a14] border border-white/10 rounded-lg flex items-center justify-center text-[#8a7f6e] hover:text-[#e89c3e] hover:border-[#e89c3e] transition-all duration-300"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-syne font-bold text-xs uppercase tracking-[0.1em] text-[#f4ede0] mb-4">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3 list-none">
              <li>
                <button
                  onClick={(e) => handleNavClick(e, "home")}
                  className="text-[#8a7f6e] text-sm hover:text-[#e89c3e] transition-colors bg-transparent border-none cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNavClick(e, "inventory")}
                  className="text-[#8a7f6e] text-sm hover:text-[#e89c3e] transition-colors bg-transparent border-none cursor-pointer text-left"
                >
                  Inventory
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNavClick(e, "about")}
                  className="text-[#8a7f6e] text-sm hover:text-[#e89c3e] transition-colors bg-transparent border-none cursor-pointer text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNavClick(e, "contact")}
                  className="text-[#8a7f6e] text-sm hover:text-[#e89c3e] transition-colors bg-transparent border-none cursor-pointer text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-syne font-bold text-xs uppercase tracking-[0.1em] text-[#f4ede0] mb-4">
              Services
            </h4>
            <ul className="flex flex-col gap-3 list-none">
              <li>
                <a
                  href="#"
                  className="text-[#8a7f6e] text-sm hover:text-[#e89c3e] transition-colors"
                >
                  Car Valuation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#8a7f6e] text-sm hover:text-[#e89c3e] transition-colors"
                >
                  Finance & EMI
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#8a7f6e] text-sm hover:text-[#e89c3e] transition-colors"
                >
                  Insurance
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#8a7f6e] text-sm hover:text-[#e89c3e] transition-colors"
                >
                  RC Transfer
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#8a7f6e] text-sm hover:text-[#e89c3e] transition-colors"
                >
                  Car Inspection
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-syne font-bold text-xs uppercase tracking-[0.1em] text-[#f4ede0] mb-4">
              Contact Info
            </h4>
            <ul className="flex flex-col gap-3 list-none">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#e89c3e] mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href="tel:+919876543210"
                    className="text-[#8a7f6e] text-sm hover:text-[#e89c3e] transition-colors block"
                  >
                    +91 98765 43210
                  </a>
                  <span className="text-[#6b6356] text-xs">
                    Mon-Sat, 10AM-7PM
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#e89c3e] mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href="mailto:info@ssfinworld.com"
                    className="text-[#8a7f6e] text-sm hover:text-[#e89c3e] transition-colors block"
                  >
                    info@ssfinworld.com
                  </a>
                  <span className="text-[#6b6356] text-xs">24/7 Support</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#e89c3e] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[#8a7f6e] text-sm block">
                    Mumbai, Maharashtra
                  </span>
                  <span className="text-[#6b6356] text-xs">India</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#e89c3e] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[#8a7f6e] text-sm block">
                    Open Hours
                  </span>
                  <span className="text-[#6b6356] text-xs">
                    Mon-Sat: 10AM - 7PM
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-7 border-t border-white/10 flex flex-wrap justify-between items-center gap-3 text-xs text-[#8a7f6e]">
          <div>&copy; 2025 SSFINWORLD CarHub. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#e89c3e] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#e89c3e] transition-colors">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-[#e89c3e] transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
