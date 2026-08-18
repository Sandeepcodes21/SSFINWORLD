import React, { useState, useEffect } from "react";
import {
  Camera,
  Car,
  Lock,
  Unlock,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Shield,
  Star,
  Quote,
} from "lucide-react";
import { useCars } from "../hooks/useCars";

const Hero = ({ isAdmin, onUploadClick }) => {
  const { cars, getStats } = useCars();
  const [totalCars, setTotalCars] = useState(0);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Typing animation states
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const features = [
    { icon: Shield, text: "100% Verified Listings" },
    { icon: Camera, text: "Multi-Image Gallery" },
    { icon: TrendingUp, text: "Best Price Guarantee" },
    { icon: Star, text: "Trusted by 500+ Customers" },
  ];

  // English phrases for typing animation
  const englishPhrases = [
    "अपनी कार घर लाएं",
    "सटीकता के साथ चलाएं",
    "आपकी सपनों की गाड़ी",
    "अपनी यात्रा शुरू करें",
    "प्रीमियम गुणवत्ता",
    "2020 से भरोसेमंद",
    "शान से गाड़ी चलाएं",
    "हर सफर खास बनाएं",
  ];

  // Rotating Hindi Quotes (Kept in Hindi)
  const hindiQuotes = [
    "सपनों की गाड़ी अब आपके पास",
    "खरीदें भरोसेमंद, बेचें आसानी से",
    "हर गाड़ी है खास, हम करते हैं पास",
    "प्रीमियम कारें, देसी भरोसा",
    "गाड़ी चाहिए? SSFINWORLD है ना!",
    "भरोसा रखें, SSFINWORLD के साथ",
    "गाड़ी हो या सपना, दोनों पूरे करें",
    "SSFINWORLD — जहाँ सपनों की गाड़ी मिले",
  ];

  useEffect(() => {
    const stats = getStats();
    setTotalCars(stats.total);
  }, [cars, getStats]);

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(featureInterval);
  }, [features.length]);

  // Rotate quotes every 4 seconds
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % hindiQuotes.length);
    }, 4000);
    return () => clearInterval(quoteInterval);
  }, [hindiQuotes.length]);

  // Typing Animation Effect
  useEffect(() => {
    const currentPhrase = englishPhrases[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        if (displayText.length === currentPhrase.length) {
          // Pause before deleting
          setTimeout(() => {
            setIsDeleting(true);
            setTypingSpeed(50);
          }, 2000);
        }
      } else {
        // Deleting
        setDisplayText(currentPhrase.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setTypingSpeed(150);
          // Move to next phrase
          setTextIndex((prev) => (prev + 1) % englishPhrases.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, typingSpeed]);

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

  const handleUploadClick = () => {
    if (isAdmin) {
      scrollToSection("sell");
    } else {
      onUploadClick();
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen pt-32 pb-20 px-6 md:px-10 flex flex-col justify-center relative z-1 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#e89c3e]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#f5b800]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#e89c3e]/3 rounded-full blur-3xl"></div>

        {/* Floating Particles */}
        <div
          className="absolute top-32 left-1/4 w-2 h-2 bg-[#e89c3e] rounded-full animate-float"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-48 right-1/4 w-3 h-3 bg-[#f5b800] rounded-full animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute bottom-40 left-1/3 w-2 h-2 bg-[#e89c3e] rounded-full animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-4 h-4 bg-[#e89c3e]/30 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Tag with Sparkle */}
      <div className="inline-flex items-center gap-2.5 px-4 py-2 border border-white/16 rounded-full text-[11px] tracking-[0.15em] uppercase text-[#8a7f6e] bg-[#15130f]/60 w-fit mb-6 relative group cursor-default">
        <span className="w-1.5 h-1.5 bg-[#e89c3e] rounded-full shadow-lg shadow-[#e89c3e] animate-pulse-slow"></span>
        Premium Used Car Marketplace
        <Sparkles className="w-3 h-3 text-[#e89c3e] ml-1 animate-pulse" />
      </div>

      {/* Hindi Quote - Rotating with fade effect (Kept in Hindi) */}
      <div className="flex items-center gap-2 mb-4">
        <Quote className="w-4 h-4 text-[#e89c3e] opacity-60 flex-shrink-0" />
        <div className="relative h-8 overflow-hidden">
          {hindiQuotes.map((quote, idx) => (
            <div
              key={idx}
              className={`absolute left-0 right-0 transition-all duration-700 ${
                idx === currentQuoteIndex
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <span className="text-[#e89c3e] text-sm md:text-base font-medium font-hindi">
                {quote}
              </span>
            </div>
          ))}
        </div>
        <span className="w-1.5 h-1.5 bg-[#e89c3e]/50 rounded-full animate-pulse flex-shrink-0"></span>
      </div>

      {/* Main Heading - Typing Animation in English */}
      <div className="relative">
        <h1 className="font-syne font-extrabold text-[clamp(42px,9vw,130px)] leading-[0.92] tracking-[-0.04em] text-[#f4ede0] mb-3 relative min-h-[200px]">
          <span className="relative">
            {displayText}
            <span className="inline-block w-1 h-[0.7em] bg-[#e89c3e] ml-1 animate-pulse align-middle"></span>
          </span>
          <br />
          <span className="bg-gradient-to-r from-[#e89c3e] via-[#f5b800] to-[#e89c3e] bg-clip-text text-transparent font-semibold italic animate-gradient"></span>
          <span className="absolute -top-6 -right-6 md:-top-10 md:-right-10 text-3xl md:text-5xl animate-bounce">
            🚗
          </span>
        </h1>
      </div>

      {/* English Description */}
      <p className="text-[#8a7f6e] text-lg max-w-[580px] leading-relaxed mt-4">
        "SSFINWORLD CarHub पर अपनी पसंदीदा पुरानी (यूज्ड) गाड़ी खोजें, हमारी
        मल्टी-इमेज गैलरी में हर डिटेल को करीब से देखें, और सीधे भरोसेमंद
        विक्रेताओं से संपर्क करें।"
      </p>

      {/* English Sub-text */}
      <p className="text-[#6b6356] text-sm max-w-[580px] leading-relaxed mb-6">
        India's trusted premium pre-owned car marketplace — bringing your dream
        car closer to you.
      </p>

      {/* Rotating Features */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center gap-2 text-[#e89c3e]">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`transition-all duration-700 ${
                idx === currentFeature
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2 absolute"
              }`}
            >
              <div className="flex items-center gap-2 text-sm bg-[#15130f]/60 px-3 py-1.5 rounded-full border border-[#e89c3e]/20">
                <feature.icon className="w-3.5 h-3.5" />
                <span className="text-[#f4ede0] font-medium">
                  {feature.text}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-1">
          {features.map((_, idx) => (
            <div
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                idx === currentFeature ? "bg-[#e89c3e] w-4" : "bg-[#8a7f6e]/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => scrollToSection("inventory")}
          className="group inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#e89c3e] to-[#f5b800] text-[#0c0b0a] rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#e89c3e]/50 relative overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-[#f5b800] to-[#e89c3e] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <Car className="w-4 h-4 relative z-10" />
          <span className="relative z-10">Explore Cars</span>
          <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
        </button>
        <button
          onClick={handleUploadClick}
          className="group inline-flex items-center gap-2.5 px-8 py-4 bg-transparent text-[#f4ede0] border border-white/16 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-[#15130f] hover:border-[#e89c3e] hover:shadow-lg hover:shadow-[#e89c3e]/10"
        >
          <Camera className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Sell Your Car</span>
        </button>
      </div>

      {/* Hindi Quote Tagline Below Buttons (Kept in Hindi) */}
      <div className="mt-3 text-xs text-[#6b6356] font-hindi tracking-wide animate-pulse">
        ✨ "सपनों की गाड़ी ढूंढें, SSFINWORLD पर"
      </div>

      {/* Admin Status */}
      <div className="mt-4">
        {!isAdmin ? (
          <div className="inline-flex items-center gap-2 text-[#6b6356] text-sm animate-fade-in"></div>
        ) : (
          <div className="inline-flex items-center gap-2 text-[#6ab04c] text-sm animate-fade-in">
            <Unlock className="w-3.5 h-3.5 text-[#6ab04c]" />
            <span className="bg-[#6ab04c]/10 px-3 py-1 rounded-full border border-[#6ab04c]/20">
              Admin Mode Active — You can now add car listings
            </span>
          </div>
        )}
      </div>

      {/* Stats with Icons - English Labels */}
      <div className="flex flex-wrap gap-12 md:gap-16 mt-14 pt-10 border-t border-white/10 max-w-[700px]">
        <div className="group cursor-pointer hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-2">
            <Car className="w-6 h-6 text-[#e89c3e] opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="font-syne font-bold text-[56px] leading-none tracking-[-0.02em] text-[#f4ede0]">
              <span id="stat-total">{totalCars}</span>
            </div>
          </div>
          <div className="text-xs text-[#8a7f6e] uppercase tracking-[0.15em] mt-2.5">
            Cars Available
          </div>
        </div>
        <div className="group cursor-pointer hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-[#e89c3e] opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="font-syne font-bold text-[56px] leading-none tracking-[-0.02em] text-[#f4ede0]">
              12<span className="text-[#e89c3e] text-3xl">+</span>
            </div>
          </div>
          <div className="text-xs text-[#8a7f6e] uppercase tracking-[0.15em] mt-2.5">
            Brands
          </div>
        </div>
        <div className="group cursor-pointer hover:scale-105 transition-transform duration-300">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#e89c3e] opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="font-syne font-bold text-[56px] leading-none tracking-[-0.02em] text-[#f4ede0]">
              100<span className="text-[#e89c3e] text-3xl">%</span>
            </div>
          </div>
          <div className="text-xs text-[#8a7f6e] uppercase tracking-[0.15em] mt-2.5">
            Verified
          </div>
        </div>
      </div>

      {/* Right Side Decorative Elements */}
      <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 w-[40%] max-w-[500px] opacity-60 pointer-events-none">
        <div className="relative">
          <div className="h-px bg-gradient-to-r from-transparent via-[#e89c3e] to-transparent mb-8 relative">
            <span className="absolute right-0 -top-[3px] w-1.5 h-1.5 bg-[#e89c3e] rounded-full shadow-lg shadow-[#e89c3e] animate-pulse"></span>
          </div>

          <div className="space-y-2">
            <div className="text-xs text-[#8a7f6e] tracking-wide text-right opacity-70 hover:opacity-100 transition-opacity">
              Trusted • Premium • Secure
            </div>
            <div className="font-syne text-[10px] text-[#6b6356] uppercase tracking-[0.3em] text-right">
              <span className="inline-flex items-center gap-2">
                <span className="w-1 h-1 bg-[#e89c3e] rounded-full"></span>
                Trusted Platform
              </span>
            </div>
          </div>

          {/* Decorative Car Silhouette */}
          <div className="mt-12 opacity-10">
            <svg viewBox="0 0 200 80" className="w-full">
              <path
                d="M10 40 L20 25 L40 15 L160 15 L180 25 L190 40 L185 45 L15 45 L10 40Z"
                fill="currentColor"
                className="text-[#f4ede0]"
              />
              <circle
                cx="50"
                cy="45"
                r="12"
                fill="currentColor"
                className="text-[#f4ede0]"
              />
              <circle
                cx="150"
                cy="45"
                r="12"
                fill="currentColor"
                className="text-[#f4ede0]"
              />
              <circle cx="50" cy="45" r="6" fill="#0c0b0a" />
              <circle cx="150" cy="45" r="6" fill="#0c0b0a" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
