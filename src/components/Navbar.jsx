import React, { useState } from "react";
import {
  Lock,
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
      <nav className="fixed top-0 left-0 right-0 z-[100] px-3 sm:px-4 md:px-6 lg:px-10 py-3 sm:py-4 flex justify-between items-center bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-sm">
        {/* Logo - Updated with "SSFINWORLD" */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer no-underline group flex-shrink-0"
        >
          {/* Custom SVG Logo */}
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11">
            <div className="absolute inset-0 bg-gradient-to-br from-[#e89c3e] to-[#f5b800] rounded-xl shadow-md shadow-[#e89c3e]/30 group-hover:shadow-lg group-hover:shadow-[#e89c3e]/50 transition-all duration-300 group-hover:scale-105"></div>

            {/* Main Logo SVG */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full p-1.5 relative z-10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="50"
                cy="50"
                r="38"
                stroke="#0c0b0a"
                strokeWidth="2"
                strokeDasharray="6 4"
                className="opacity-60"
              />
              <path
                d="M20 55 L22 45 L30 38 L70 38 L78 45 L80 55 L76 58 L24 58 L20 55Z"
                fill="#0c0b0a"
                stroke="#0c0b0a"
                strokeWidth="1.5"
              />
              <path
                d="M32 38 L35 28 L65 28 L68 38"
                stroke="#0c0b0a"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M35 38 L38 30 L44 30 L44 38"
                fill="#0c0b0a"
                opacity="0.3"
              />
              <path
                d="M56 38 L56 30 L62 30 L65 38"
                fill="#0c0b0a"
                opacity="0.3"
              />
              <circle cx="38" cy="56" r="6" fill="#0c0b0a" />
              <circle cx="38" cy="56" r="3" fill="#e89c3e" />
              <circle cx="38" cy="56" r="1" fill="#0c0b0a" />
              <circle cx="62" cy="56" r="6" fill="#0c0b0a" />
              <circle cx="62" cy="56" r="3" fill="#e89c3e" />
              <circle cx="62" cy="56" r="1" fill="#0c0b0a" />
              <path
                d="M20 48 L18 48 L18 52 L20 52"
                stroke="#f5b800"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M80 48 L82 48 L82 52 L80 52"
                stroke="#f5b800"
                strokeWidth="1.5"
                fill="none"
              />
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
              <path
                d="M50 10 L52 16 L58 16 L53.5 20 L55.5 26 L50 22 L44.5 26 L46.5 20 L42 16 L48 16 L50 10Z"
                fill="#f5b800"
                opacity="0.8"
              />
            </svg>
          </div>

          {/* Brand Name */}
          <div className="font-syne font-extrabold text-base sm:text-lg md:text-xl lg:text-2xl tracking-tight text-slate-900">
            <span className="relative">
              SSFINWORLD
              <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-gradient-to-r from-[#e89c3e] to-transparent opacity-70"></span>
            </span>
            <span className="text-[#e89c3e] ml-1">CarHub</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex gap-1 list-none items-center">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="flex items-center gap-1.5 px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-300 text-sm font-medium no-underline cursor-pointer"
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
                      ? "text-[#d97706] hover:text-[#b45309] hover:bg-[#e89c3e]/10 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5" /> {item.label}
                </a>
              </li>
            ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Admin Status Badge */}
          {isAdmin && (
            <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
              <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600" />
              <span className="text-emerald-700 text-[10px] sm:text-xs font-semibold">
                Admin
              </span>
            </div>
          )}

          {/* Admin Login/Logout Button - Desktop */}
          <button
            onClick={isAdmin ? onLogout : onLoginClick}
            className={`hidden md:flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 ${
              isAdmin
                ? "bg-transparent text-rose-600 border border-rose-300 hover:bg-rose-600 hover:text-white"
                : "bg-[#e89c3e] text-slate-950 hover:bg-[#f5b800] hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#e89c3e]/30"
            }`}
          >
            {isAdmin ? (
              <>
                <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Logout</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Admin Login</span>
              </>
            )}
          </button>

          {/* Mobile - Small Login Icon */}
          <button
            onClick={isAdmin ? onLogout : onLoginClick}
            className="md:hidden flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 transition-colors"
            aria-label={isAdmin ? "Logout" : "Login"}
          >
            {isAdmin ? (
              <LogOut className="w-4 h-4 text-rose-600" />
            ) : (
              <Lock className="w-4 h-4 text-[#d97706]" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="flex lg:hidden items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-[60px] sm:top-[68px] md:top-[72px] left-0 right-0 z-[99] bg-white/98 backdrop-blur-xl border-b border-slate-200 shadow-xl transition-all duration-300 transform ${
          mobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-4 sm:p-6 flex flex-col gap-0.5 sm:gap-1 max-h-[calc(100vh-60px)] overflow-y-auto">
          {/* Main Navigation */}
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className="flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-3.5 text-slate-800 hover:bg-slate-100 rounded-lg transition-colors text-sm sm:text-base font-medium no-underline active:bg-slate-200"
            >
              <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#d97706]" />
              <span>{item.label}</span>
            </a>
          ))}

          {/* Admin-only mobile menu items */}
          {isAdmin &&
            adminNavItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg transition-colors text-sm sm:text-base font-medium no-underline active:bg-slate-200 ${
                  item.highlight
                    ? "text-[#d97706] hover:bg-amber-50 font-semibold"
                    : "text-slate-800 hover:bg-slate-100"
                }`}
              >
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#d97706]" />
                {item.label}
              </a>
            ))}

          {/* Divider */}
          <div className="border-t border-slate-200 my-2 sm:my-3"></div>

          {/* Admin Status & Actions */}
          <div className="px-3 sm:px-4 py-1.5 sm:py-2">
            {isAdmin ? (
              <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 text-[10px] sm:text-xs font-semibold">
                  Admin Mode Active
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-500 text-[10px] sm:text-xs">
                <Lock className="w-3 h-3 text-[#d97706]" />
                <span>Login to add car listings</span>
              </div>
            )}
          </div>

          {/* Login/Logout Button in Mobile Menu */}
          <button
            onClick={isAdmin ? onLogout : onLoginClick}
            className={`flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg transition-colors text-sm sm:text-base font-medium w-full text-left active:bg-slate-200 ${
              isAdmin
                ? "text-rose-600 hover:bg-rose-50"
                : "text-[#d97706] hover:bg-amber-50 font-semibold"
            }`}
          >
            {isAdmin ? (
              <>
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" /> Logout
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 sm:w-5 sm:h-5" /> Admin Login
              </>
            )}
          </button>

          {/* Quick Contact in Mobile Menu */}
          <div className="border-t border-slate-200 mt-2 sm:mt-3 pt-2 sm:pt-3 px-3 sm:px-4">
            <p className="text-slate-400 text-[10px] sm:text-xs mb-1.5 sm:mb-2 font-medium">
              Quick Contact
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-1.5 sm:gap-2 text-slate-600 text-[10px] sm:text-xs hover:text-[#d97706] transition-colors no-underline"
              >
                <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Call
              </a>
              <a
                href="mailto:info@ssfinworld.com"
                className="flex items-center gap-1.5 sm:gap-2 text-slate-600 text-[10px] sm:text-xs hover:text-[#d97706] transition-colors no-underline"
              >
                <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Email
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2 text-slate-600 text-[10px] sm:text-xs hover:text-[#25d366] transition-colors no-underline"
              >
                <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[98] bg-slate-900/30 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
