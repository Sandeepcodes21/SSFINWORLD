import React, { useState, useEffect } from "react";
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

  // Mobile menu open hone par background scroll lock karne ke liye
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Screen resize hone par mobile menu auto close karne ke liye
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const section = document.getElementById(sectionId);
    if (section) {
      const nav = document.querySelector("nav");
      const navHeight = nav ? nav.offsetHeight : 64;
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

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "about", label: "About", icon: Users },
    { id: "contact", label: "Contact", icon: Phone },
  ];

  const adminNavItems = [
    { id: "sell", label: "Add Car", icon: PlusCircle, highlight: true },
  ];

  return (
    <>
      {/* Main Navbar Header */}
      <nav className="fixed top-0 left-0 right-0 z-[100] h-16 sm:h-18 md:h-20 px-3 sm:px-5 md:px-8 lg:px-10 flex justify-between items-center bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all duration-300">
        {/* Brand Logo & Title */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer no-underline group shrink-0 max-w-[65%] xs:max-w-none"
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#e89c3e] to-[#f5b800] rounded-lg sm:rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300"></div>

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

          <div className="font-syne font-extrabold text-sm sm:text-base md:text-xl lg:text-2xl tracking-tight text-slate-900 truncate">
            <span className="relative">
              SSFINWORLD
              <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-gradient-to-r from-[#e89c3e] to-transparent opacity-70"></span>
            </span>
            <span className="text-[#e89c3e] ml-1">CarHub</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex items-center gap-1 list-none m-0 p-0">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="flex items-center gap-1.5 px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200 text-sm font-medium no-underline cursor-pointer"
              >
                <item.icon className="w-4 h-4" /> {item.label}
              </a>
            </li>
          ))}

          {isAdmin &&
            adminNavItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-semibold no-underline cursor-pointer ${
                    item.highlight
                      ? "text-[#d97706] hover:text-[#b45309] hover:bg-amber-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <item.icon className="w-4 h-4" /> {item.label}
                </a>
              </li>
            ))}
        </ul>

        {/* Right Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 shrink-0">
          {/* Admin Status Pill */}
          {isAdmin && (
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-full">
              <Shield className="w-3 h-3 text-emerald-600" />
              <span className="text-emerald-700 text-[11px] font-bold uppercase tracking-wider">
                Admin
              </span>
            </div>
          )}

          {/* Desktop Auth Button */}
          <button
            onClick={isAdmin ? onLogout : onLoginClick}
            className={`hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
              isAdmin
                ? "bg-transparent text-rose-600 border border-rose-200 hover:bg-rose-50"
                : "bg-gradient-to-r from-[#e89c3e] to-[#f5b800] text-slate-950 hover:opacity-95 shadow-sm active:scale-95"
            }`}
          >
            {isAdmin ? (
              <>
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Admin Login</span>
              </>
            )}
          </button>

          {/* Mobile Login Quick Button */}
          <button
            onClick={isAdmin ? onLogout : onLoginClick}
            className="md:hidden flex items-center justify-center min-w-[38px] min-h-[38px] w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 active:bg-slate-200 transition-colors"
            aria-label={isAdmin ? "Logout" : "Login"}
          >
            {isAdmin ? (
              <LogOut className="w-4 h-4 text-rose-600" />
            ) : (
              <Lock className="w-4 h-4 text-[#d97706]" />
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden flex items-center justify-center min-w-[38px] min-h-[38px] w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 active:bg-slate-200 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-slate-900" />
            ) : (
              <Menu className="w-5 h-5 text-slate-900" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-16 sm:top-18 md:top-20 left-0 right-0 z-[99] bg-white border-b border-slate-200 shadow-2xl transition-all duration-300 ease-in-out lg:hidden transform ${
          mobileMenuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-4 sm:p-5 flex flex-col gap-1 max-h-[calc(100dvh-4.5rem)] overflow-y-auto">
          {/* Mobile Nav Links */}
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className="flex items-center gap-3 px-3.5 py-3 text-slate-800 hover:bg-slate-100 rounded-xl transition-colors text-sm font-semibold no-underline active:bg-slate-200/80 min-h-[44px]"
            >
              <item.icon className="w-4 h-4 text-[#d97706] shrink-0" />
              <span>{item.label}</span>
            </a>
          ))}

          {/* Admin Links */}
          {isAdmin &&
            adminNavItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl transition-colors text-sm font-semibold no-underline active:bg-slate-200 min-h-[44px] ${
                  item.highlight
                    ? "text-[#d97706] bg-amber-50/80"
                    : "text-slate-800 hover:bg-slate-100"
                }`}
              >
                <item.icon className="w-4 h-4 text-[#d97706] shrink-0" />
                <span>{item.label}</span>
              </a>
            ))}

          <div className="border-t border-slate-200 my-1.5"></div>

          {/* Admin Status Notice */}
          <div className="py-1">
            {isAdmin ? (
              <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-xl">
                <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-emerald-700 text-xs font-bold">
                  Admin Mode Active
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium px-2 py-1">
                <Lock className="w-3.5 h-3.5 text-[#d97706] shrink-0" />
                <span>Login to manage car listings</span>
              </div>
            )}
          </div>

          {/* Login/Logout Button Mobile */}
          <button
            onClick={isAdmin ? onLogout : onLoginClick}
            className={`flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl transition-colors text-sm font-bold w-full mt-1 cursor-pointer min-h-[44px] active:scale-[0.98] ${
              isAdmin
                ? "text-rose-600 bg-rose-50 border border-rose-200 active:bg-rose-100"
                : "text-slate-950 bg-gradient-to-r from-[#e89c3e] to-[#f5b800] shadow-sm"
            }`}
          >
            {isAdmin ? (
              <>
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Logout</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 shrink-0" />
                <span>Admin Login</span>
              </>
            )}
          </button>

          {/* Quick Contact Footer */}
          <div className="border-t border-slate-200 mt-3 pt-3 px-1">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-2">
              Quick Contact
            </p>
            <div className="grid grid-cols-3 gap-2">
              <a
                href="tel:+919876543210"
                className="flex items-center justify-center gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-xs font-semibold hover:text-[#d97706] no-underline active:bg-slate-100"
              >
                <Phone className="w-3.5 h-3.5 text-slate-500" /> Call
              </a>
              <a
                href="mailto:info@ssfinworld.com"
                className="flex items-center justify-center gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-xs font-semibold hover:text-[#d97706] no-underline active:bg-slate-100"
              >
                <Mail className="w-3.5 h-3.5 text-slate-500" /> Email
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-xs font-semibold hover:text-[#25d366] no-underline active:bg-slate-100"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-500" /> Chat
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop Blur Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[98] bg-slate-900/40 backdrop-blur-xs lg:hidden transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
