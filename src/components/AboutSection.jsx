import React, { useState, useEffect } from "react";
import {
  Shield,
  Award,
  Users,
  Clock,
  Car,
  Star,
  CheckCircle,
  ThumbsUp,
  Heart,
  Briefcase,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Zap,
  Gem,
  Target,
  Globe,
  Rocket,
  Medal,
} from "lucide-react";

const AboutSection = () => {
  const [activeStat, setActiveStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    {
      icon: Shield,
      title: "Verified Listings",
      description:
        "Har car ki complete verification hoti hai. Genuine sellers aur transparent details.",
      color: "from-blue-500/20 to-blue-600/10",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-400",
    },
    {
      icon: Award,
      title: "Premium Quality",
      description:
        "Only premium used cars with excellent condition and service history.",
      color: "from-amber-500/20 to-amber-600/10",
      borderColor: "border-amber-500/30",
      iconColor: "text-amber-400",
    },
    {
      icon: Users,
      title: "Trusted Community",
      description:
        "500+ happy customers ne apni dream car humse purchase ki hai.",
      color: "from-emerald-500/20 to-emerald-600/10",
      borderColor: "border-emerald-500/30",
      iconColor: "text-emerald-400",
    },
    {
      icon: Clock,
      title: "Quick Process",
      description:
        "Fast listing, quick verification, aur instant buyer connection.",
      color: "from-purple-500/20 to-purple-600/10",
      borderColor: "border-purple-500/30",
      iconColor: "text-purple-400",
    },
  ];

  const stats = [
    {
      value: "500+",
      label: "Happy Customers",
      icon: ThumbsUp,
      color: "#6ab04c",
    },
    { value: "50+", label: "Car Brands", icon: Car, color: "#e89c3e" },
    { value: "98%", label: "Satisfaction Rate", icon: Heart, color: "#eb5757" },
    { value: "24/7", label: "Customer Support", icon: Clock, color: "#f5b800" },
  ];

  const milestones = [
    {
      year: "2020",
      title: "Founded",
      description:
        "SSFINWORLD CarHub was established with a vision to revolutionize used car marketplace.",
      icon: Rocket,
    },
    {
      year: "2021",
      title: "First 100 Listings",
      description:
        "Achieved 100+ car listings with verified sellers across Mumbai.",
      icon: Target,
    },
    {
      year: "2022",
      title: "Pan-India Reach",
      description: "Expanded services across multiple cities in India.",
      icon: Globe,
    },
    {
      year: "2023",
      title: "Community Milestone",
      description: "500+ happy customers and 98% satisfaction rate.",
      icon: Medal,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <section
      id="about"
      className="py-16 md:py-24 px-6 md:px-10 relative z-1 bg-gradient-to-b from-[#0c0b0a] via-[#0c0b0a] to-[#15130f] overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#e89c3e]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#f5b800]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-[#e89c3e]/3 rounded-full blur-3xl"></div>

        {/* Floating Elements */}
        <div
          className="absolute top-20 right-20 w-2 h-2 bg-[#e89c3e] rounded-full animate-float"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-3 h-3 bg-[#f5b800] rounded-full animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-2 h-2 bg-[#e89c3e] rounded-full animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/3 w-4 h-4 bg-[#e89c3e]/30 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 border border-white/16 rounded-full text-[11px] tracking-[0.15em] uppercase text-[#8a7f6e] bg-[#15130f]/60 mb-4 animate-fade-in">
            <span className="w-1.5 h-1.5 bg-[#e89c3e] rounded-full shadow-lg shadow-[#e89c3e] animate-pulse-slow"></span>
            About Us
            <Sparkles className="w-3 h-3 text-[#e89c3e] ml-1" />
          </div>
          <h2 className="font-syne font-bold text-[clamp(32px,5vw,50px)] tracking-[-0.03em] text-[#f4ede0] leading-tight">
            Premium Used Car <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#e89c3e] via-[#f5b800] to-[#e89c3e] bg-clip-text text-transparent animate-gradient">
                Marketplace
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#e89c3e] to-transparent"></span>
            </span>
          </h2>
          <p className="text-[#8a7f6e] max-w-[600px] mx-auto mt-4 text-sm leading-relaxed">
            SSFINWORLD CarHub is India's trusted platform for buying and selling
            premium used cars. We connect genuine buyers with verified sellers.
          </p>
        </div>

        {/* Stats with Animation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`group bg-[#15130f] border border-white/10 rounded-xl p-4 md:p-6 text-center transition-all duration-500 hover:border-[#e89c3e]/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#e89c3e]/10 cursor-pointer ${
                idx === activeStat
                  ? "border-[#e89c3e]/40 shadow-lg shadow-[#e89c3e]/10"
                  : ""
              }`}
              onMouseEnter={() => setActiveStat(idx)}
            >
              <div className="relative">
                <div
                  className={`flex justify-center mb-2 transition-all duration-300 group-hover:scale-110 ${
                    idx === activeStat ? "scale-110" : ""
                  }`}
                >
                  <stat.icon
                    className="w-6 h-6 text-[#e89c3e]"
                    style={{ color: stat.color }}
                  />
                </div>
                <div className="font-syne font-bold text-2xl md:text-3xl lg:text-4xl text-[#e89c3e] transition-all duration-300">
                  {stat.value}
                </div>
                <div className="text-[#8a7f6e] text-[10px] md:text-xs uppercase tracking-[0.1em] mt-1">
                  {stat.label}
                </div>
                {idx === activeStat && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#e89c3e] rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-[#15130f] border border-white/10 rounded-xl p-6 hover:border-[#e89c3e]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#e89c3e]/10 relative overflow-hidden"
            >
              {/* Animated gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>

              <div className="relative z-10">
                <div
                  className={`w-12 h-12 bg-gradient-to-br from-[#e89c3e]/15 to-[#f5b800]/10 border ${feature.borderColor} rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#e89c3e]/20`}
                >
                  <feature.icon
                    className={`w-6 h-6 ${feature.iconColor} transition-all duration-300 group-hover:text-[#e89c3e]`}
                  />
                </div>
                <h3 className="font-syne font-bold text-lg text-[#f4ede0] mb-2 transition-colors group-hover:text-[#e89c3e]">
                  {feature.title}
                </h3>
                <p className="text-[#8a7f6e] text-sm leading-relaxed group-hover:text-[#f4ede0]/80 transition-colors">
                  {feature.description}
                </p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-4 h-4 text-[#e89c3e]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-br from-[#15130f] to-[#1d1a14] border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#e89c3e]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f5b800]/5 rounded-full blur-3xl"></div>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Gem className="w-5 h-5 text-[#e89c3e]" />
                <h3 className="font-syne font-bold text-2xl text-[#f4ede0]">
                  Why Choose{" "}
                  <span className="text-[#e89c3e]">SSFINWORLD CarHub?</span>
                </h3>
              </div>
              <ul className="space-y-3">
                {[
                  "100% verified car listings with complete details",
                  "Multi-image gallery for transparent viewing",
                  "Direct WhatsApp inquiry with sellers",
                  "Free car valuation and inspection tips",
                  "Secure and trusted platform with 24/7 support",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-[#8a7f6e] text-sm group hover:text-[#f4ede0] transition-colors duration-300"
                  >
                    <CheckCircle className="w-4 h-4 text-[#6ab04c] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-4 mt-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-[#e89c3e] fill-[#e89c3e] animate-pulse"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                <span className="text-[#8a7f6e] text-sm font-medium">
                  (4.9/5 from 500+ reviews)
                </span>
                <span className="w-px h-4 bg-white/10"></span>
                <span className="flex items-center gap-1.5 text-xs text-[#6ab04c] bg-[#6ab04c]/10 px-3 py-1 rounded-full border border-[#6ab04c]/20">
                  <ThumbsUp className="w-3 h-3" /> Trusted Platform
                </span>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative group">
                <div className="w-40 h-40 md:w-56 md:h-56 bg-gradient-to-br from-[#e89c3e] to-[#f5b800] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#e89c3e]/20 transition-all duration-500 group-hover:scale-105 group-hover:shadow-3xl group-hover:shadow-[#e89c3e]/40">
                  <Car className="w-16 h-16 md:w-20 md:h-20 text-[#0c0b0a] transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-5deg]" />
                </div>
                <div className="absolute -top-3 -right-3 w-10 h-10 md:w-12 md:h-12 bg-[#15130f] border-2 border-[#e89c3e] rounded-full flex items-center justify-center shadow-lg shadow-[#e89c3e]/20 animate-bounce">
                  <Star className="w-5 h-5 md:w-6 md:h-6 text-[#e89c3e] fill-[#e89c3e]" />
                </div>
                <div
                  className="absolute -bottom-3 -left-3 w-10 h-10 md:w-12 md:h-12 bg-[#15130f] border-2 border-[#6ab04c] rounded-full flex items-center justify-center shadow-lg shadow-[#6ab04c]/20 animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                >
                  <ThumbsUp className="w-5 h-5 md:w-6 md:h-6 text-[#6ab04c]" />
                </div>
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-[#f5b800] rounded-full blur-xl opacity-20"></div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#e89c3e] rounded-full blur-xl opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
