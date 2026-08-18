import React, { useState } from "react";
import {
  Lock,
  Unlock,
  Car,
  LogOut,
  Shield,
  Home,
  Package,
  Users,
  Phone,
  PlusCircle,
  Menu,
  X,
  Mail,
  MessageCircle,
} from "lucide-react";

const Navbar = ({ isAdmin, onLoginClick, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);

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

      window.history.pushState(null, null, `#${sectionId}`);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Navigation items configuration
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "about", label: "About", icon: Users },
    { id: "contact", label: "Contact", icon: Phone },
  ];

  // Admin-only navigation items
  const adminNavItems = [
    { id: "sell", label: "Add Car", icon: PlusCircle, highlight: true },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-10 py-4 flex justify-between items-center bg-[#0c0b0a]/90 backdrop-blur-xl border-b border-white/10">
        {/* Logo - Unique SVG Design */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="flex items-center gap-3 cursor-pointer no-underline group"
        >
          {/* Custom SVG Logo */}
          <div className="relative w-10 h-10 md:w-11 md:h-11">
            <div className="absolute inset-0 bg-gradient-to-br from-[#e89c3e] to-[#f5b800] rounded-xl shadow-lg shadow-[#e89c3e]/40 group-hover:shadow-xl group-hover:shadow-[#e89c3e]/60 transition-all duration-300 group-hover:scale-105"></div>

            {/* Main Logo SVG */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full p-1.5 relative z-10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer circle - Speed ring */}
              <circle
                cx="50"
                cy="50"
                r="38"
                stroke="#0c0b0a"
                strokeWidth="2"
                strokeDasharray="6 4"
                className="opacity-60"
              />

              {/* Car body */}
              <path
                d="M20 55 L22 45 L30 38 L70 38 L78 45 L80 55 L76 58 L24 58 L20 55Z"
                fill="#0c0b0a"
                stroke="#0c0b0a"
                strokeWidth="1.5"
              />

              {/* Car roof */}
              <path
                d="M32 38 L35 28 L65 28 L68 38"
                stroke="#0c0b0a"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />

              {/* Windshield */}
              <path
                d="M35 38 L38 30 L44 30 L44 38"
                fill="#0c0b0a"
                opacity="0.3"
              />

              {/* Rear window */}
              <path
                d="M56 38 L56 30 L62 30 L65 38"
                fill="#0c0b0a"
                opacity="0.3"
              />

              {/* Front wheel */}
              <circle cx="38" cy="56" r="6" fill="#0c0b0a" />
              <circle cx="38" cy="56" r="3" fill="#e89c3e" />
              <circle cx="38" cy="56" r="1" fill="#0c0b0a" />

              {/* Rear wheel */}
              <circle cx="62" cy="56" r="6" fill="#0c0b0a" />
              <circle cx="62" cy="56" r="3" fill="#e89c3e" />
              <circle cx="62" cy="56" r="1" fill="#0c0b0a" />

              {/* Headlight */}
              <path
                d="M20 48 L18 48 L18 52 L20 52"
                stroke="#f5b800"
                strokeWidth="1.5"
                fill="none"
              />

              {/* Taillight */}
              <path
                d="M80 48 L82 48 L82 52 L80 52"
                stroke="#f5b800"
                strokeWidth="1.5"
                fill="none"
              />

              {/* Speed lines */}
              <line
                x1="10"
                y1="50"
                x2="16"
                y2="50"
                stroke="#e89c3e"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <line
                x1="8"
                y1="44"
                x2="14"
                y2="44"
                stroke="#e89c3e"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <line
                x1="8"
                y1="56"
                x2="14"
                y2="56"
                stroke="#e89c3e"
                strokeWidth="1"
                strokeLinecap="round"
              />

              {/* Premium star */}
              <path
                d="M50 10 L52 16 L58 16 L53.5 20 L55.5 26 L50 22 L44.5 26 L46.5 20 L42 16 L48 16 L50 10Z"
                fill="#f5b800"
                opacity="0.8"
              />
            </svg>
          </div>

          {/* Brand Name */}
          <div className="font-syne font-extrabold text-xl md:text-2xl tracking-tight text-[#f4ede0]">
            <span className="relative">
              SSFINWORLD
              <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-gradient-to-r from-[#e89c3e] to-transparent opacity-50"></span>
            </span>
            <span className="text-[#e89c3e] ml-1">CarHub</span>
          </div>
        </a>

        {/* Desktop Navigation - using <a> tags */}
        <ul className="hidden lg:flex gap-1 list-none items-center">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="flex items-center gap-1.5 px-3 py-2 text-[#8a7f6e] hover:text-[#f4ede0] hover:bg-[#1d1a14] rounded-lg transition-all duration-300 text-sm font-medium no-underline cursor-pointer"
              >
                <item.icon className="w-3.5 h-3.5" /> {item.label}
              </a>
            </li>
          ))}

          {/* Admin-only menu items */}
          {isAdmin &&
            adminNavItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-300 text-sm font-medium no-underline cursor-pointer ${
                    item.highlight
                      ? "text-[#e89c3e] hover:text-[#f5b800] hover:bg-[#e89c3e]/10"
                      : "text-[#8a7f6e] hover:text-[#f4ede0] hover:bg-[#1d1a14]"
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5" /> {item.label}
                </a>
              </li>
            ))}
        </ul>

        {/* Right Section - Admin Controls + Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          {/* Admin Status Badge */}
          {isAdmin && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#6ab04c]/10 border border-[#6ab04c]/20 rounded-full">
              <Shield className="w-3.5 h-3.5 text-[#6ab04c]" />
              <span className="text-[#6ab04c] text-xs font-medium">Admin</span>
            </div>
          )}

          {/* Admin Login/Logout Button */}
          <button
            onClick={isAdmin ? onLogout : onLoginClick}
            className={`hidden md:flex items-center gap-2 px-4 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${
              isAdmin
                ? "bg-transparent text-[#eb5757] border border-[#eb5757]/30 hover:bg-[#eb5757] hover:text-white hover:border-[#eb5757]"
                : "bg-[#e89c3e] text-[#0c0b0a] hover:bg-[#f5b800] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#e89c3e]/40"
            }`}
          >
            {isAdmin ? (
              <>
                <LogOut className="w-4 h-4" /> Logout
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" /> Admin Login
              </>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-[#1d1a14] border border-white/10 text-[#f4ede0] hover:bg-[#28241c] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - using <a> tags */}
      <div
        className={`fixed top-[72px] left-0 right-0 z-[99] bg-[#0c0b0a]/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 transform ${
          mobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-6 flex flex-col gap-1 max-h-[calc(100vh-72px)] overflow-y-auto">
          {/* Main Navigation */}
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className="flex items-center gap-3 px-4 py-3 text-[#f4ede0] hover:bg-[#1d1a14] rounded-lg transition-colors text-sm font-medium no-underline"
            >
              <item.icon className="w-4 h-4 text-[#e89c3e]" /> {item.label}
            </a>
          ))}

          {/* Admin-only mobile menu items */}
          {isAdmin &&
            adminNavItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium no-underline ${
                  item.highlight
                    ? "text-[#e89c3e] hover:bg-[#1d1a14]"
                    : "text-[#f4ede0] hover:bg-[#1d1a14]"
                }`}
              >
                <item.icon
                  className={`w-4 h-4 ${item.highlight ? "text-[#e89c3e]" : "text-[#e89c3e]"}`}
                />{" "}
                {item.label}
              </a>
            ))}

          {/* Divider */}
          <div className="border-t border-white/10 my-3"></div>

          {/* Admin Status & Actions */}
          <div className="px-4 py-2">
            {isAdmin ? (
              <div className="flex items-center gap-2 px-3 py-2 bg-[#6ab04c]/10 border border-[#6ab04c]/20 rounded-lg">
                <Shield className="w-3.5 h-3.5 text-[#6ab04c]" />
                <span className="text-[#6ab04c] text-xs font-medium">
                  Admin Mode Active
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-[#6b6356] text-xs">
                <Lock className="w-3 h-3 text-[#e89c3e]" /> Login to add car
                listings
              </div>
            )}
          </div>

          {/* Login/Logout Button in Mobile Menu */}
          <button
            onClick={isAdmin ? onLogout : onLoginClick}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium w-full text-left ${
              isAdmin
                ? "text-[#eb5757] hover:bg-[#eb5757]/10"
                : "text-[#e89c3e] hover:bg-[#1d1a14]"
            }`}
          >
            {isAdmin ? (
              <>
                <LogOut className="w-4 h-4" /> Logout
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" /> Admin Login
              </>
            )}
          </button>

          {/* Quick Contact in Mobile Menu */}
          <div className="border-t border-white/10 mt-3 pt-3 px-4">
            <p className="text-[#6b6356] text-xs mb-2">Quick Contact</p>
            <div className="flex gap-3">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-[#8a7f6e] text-xs hover:text-[#e89c3e] transition-colors no-underline"
              >
                <Phone className="w-3 h-3" /> Call
              </a>
              <a
                href="mailto:info@ssfinworld.com"
                className="flex items-center gap-2 text-[#8a7f6e] text-xs hover:text-[#e89c3e] transition-colors no-underline"
              >
                <Mail className="w-3 h-3" /> Email
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#8a7f6e] text-xs hover:text-[#25d366] transition-colors no-underline"
              >
                <MessageCircle className="w-3 h-3" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
