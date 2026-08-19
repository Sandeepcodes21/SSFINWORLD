import React from "react";
import {
  Car,
  Phone,
  Mail,
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
      className="bg-slate-100/90 border-t border-slate-200 pt-16 pb-8 px-6 md:px-10 relative z-1"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-12">
          <div className="max-w-[360px]">
            <div
              className="flex items-center gap-3 mb-4 cursor-pointer"
              onClick={(e) => handleNavClick(e, "home")}
            >
              <div className="w-9 h-9 bg-gradient-to-br from-[#e89c3e] to-[#f5b800] rounded-xl flex items-center justify-center text-slate-950 font-extrabold text-sm shadow-md shadow-[#e89c3e]/30">
                <Car className="w-4 h-4" />
              </div>
              <div className="font-syne font-extrabold text-xl tracking-tight text-slate-900">
                SSFINWORLD <span className="text-[#d97706]">CarHub</span>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-4 font-medium">
              Premium used car marketplace with verified listings, multi-image
              galleries, aur transparent pricing. Apni car bechein ya kharidein
              — sab kuch ek hi jagah.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 hover:text-[#d97706] hover:border-[#d97706] shadow-sm transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 hover:text-[#d97706] hover:border-[#d97706] shadow-sm transition-all duration-300"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 hover:text-[#d97706] hover:border-[#d97706] shadow-sm transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 hover:text-[#d97706] hover:border-[#d97706] shadow-sm transition-all duration-300"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-syne font-bold text-xs uppercase tracking-[0.1em] text-slate-900 mb-4">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3 list-none p-0">
              <li>
                <button
                  onClick={(e) => handleNavClick(e, "home")}
                  className="text-slate-600 font-medium text-sm hover:text-[#d97706] transition-colors bg-transparent border-none cursor-pointer text-left p-0"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNavClick(e, "inventory")}
                  className="text-slate-600 font-medium text-sm hover:text-[#d97706] transition-colors bg-transparent border-none cursor-pointer text-left p-0"
                >
                  Inventory
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNavClick(e, "about")}
                  className="text-slate-600 font-medium text-sm hover:text-[#d97706] transition-colors bg-transparent border-none cursor-pointer text-left p-0"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNavClick(e, "contact")}
                  className="text-slate-600 font-medium text-sm hover:text-[#d97706] transition-colors bg-transparent border-none cursor-pointer text-left p-0"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-syne font-bold text-xs uppercase tracking-[0.1em] text-slate-900 mb-4">
              Services
            </h4>
            <ul className="flex flex-col gap-3 list-none p-0">
              <li>
                <a
                  href="#"
                  className="text-slate-600 font-medium text-sm hover:text-[#d97706] transition-colors"
                >
                  Car Valuation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 font-medium text-sm hover:text-[#d97706] transition-colors"
                >
                  Finance & EMI
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 font-medium text-sm hover:text-[#d97706] transition-colors"
                >
                  Insurance
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 font-medium text-sm hover:text-[#d97706] transition-colors"
                >
                  RC Transfer
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-[#6b7280] font-medium text-sm hover:text-[#d97706] transition-colors"
                >
                  Car Inspection
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-syne font-bold text-xs uppercase tracking-[0.1em] text-slate-900 mb-4">
              Contact Info
            </h4>
            <ul className="flex flex-col gap-3 list-none p-0">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#d97706] mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href="tel:+919876543210"
                    className="text-slate-700 font-medium text-sm hover:text-[#d97706] transition-colors block"
                  >
                    +91 98765 43210
                  </a>
                  <span className="text-slate-400 text-xs font-medium">
                    Mon-Sat, 10AM-7PM
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#d97706] mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href="mailto:info@ssfinworld.com"
                    className="text-slate-700 font-medium text-sm hover:text-[#d97706] transition-colors block"
                  >
                    info@ssfinworld.com
                  </a>
                  <span className="text-slate-400 text-xs font-medium">
                    24/7 Support
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#d97706] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-slate-700 font-medium text-sm block">
                    Mumbai, Maharashtra
                  </span>
                  <span className="text-slate-400 text-xs font-medium">
                    India
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#d97706] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-slate-700 font-medium text-sm block">
                    Open Hours
                  </span>
                  <span className="text-slate-400 text-xs font-medium">
                    Mon-Sat: 10AM - 7PM
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-7 border-t border-slate-200 flex flex-wrap justify-between items-center gap-3 text-xs text-slate-500 font-medium">
          <div>&copy; 2026 SSFINWORLD CarHub. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#d97706] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#d97706] transition-colors">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-[#d97706] transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
