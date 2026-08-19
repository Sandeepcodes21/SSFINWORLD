import React, { useState, useRef, useEffect } from "react";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaUser,
  FaHeadset,
  FaGlobe,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaCommentDots,
  FaRocket,
  FaHandSparkles,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { LuPhone } from "react-icons/lu";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => setSubmitSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: FaPhoneAlt,
      title: "Phone",
      details: ["+91 98765 43210", "+91 98765 43211"],
      subtitle: "Mon-Sat, 10AM-7PM",
      color: "#16a34a",
      gradient: "from-emerald-500/10 to-emerald-600/5",
      borderColor: "border-emerald-200",
    },
    {
      icon: MdEmail,
      title: "Email",
      details: ["info@ssfinworld.com", "support@ssfinworld.com"],
      subtitle: "24/7 Support",
      color: "#d97706",
      gradient: "from-amber-500/10 to-amber-600/5",
      borderColor: "border-amber-200",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Address",
      details: ["Kolkata, West Bengal"],
      subtitle: "India",
      color: "#ca8a04",
      gradient: "from-yellow-500/10 to-yellow-600/5",
      borderColor: "border-yellow-200",
    },
    {
      icon: FaClock,
      title: "Working Hours",
      details: ["Monday - Saturday", "10:00 AM - 7:00 PM"],
      subtitle: "Sunday Closed",
      color: "#15803d",
      gradient: "from-green-500/10 to-green-600/5",
      borderColor: "border-green-200",
    },
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: "#", label: "Facebook", color: "#1877f2" },
    { icon: FaTwitter, href: "#", label: "Twitter", color: "#1da1f2" },
    { icon: FaInstagram, href: "#", label: "Instagram", color: "#e4405f" },
    { icon: FaYoutube, href: "#", label: "YouTube", color: "#ff0000" },
  ];

  const quickLinks = [
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      href: "https://wa.me/919876543210",
      color: "#16a34a",
      bgColor: "bg-emerald-50",
      hoverBg: "hover:bg-emerald-100",
    },
    {
      icon: FaHeadset,
      label: "Support",
      href: "tel:+919876543210",
      color: "#d97706",
      bgColor: "bg-amber-50",
      hoverBg: "hover:bg-amber-100",
    },
    {
      icon: FaGlobe,
      label: "Website",
      href: "#",
      color: "#ca8a04",
      bgColor: "bg-yellow-50",
      hoverBg: "hover:bg-yellow-100",
    },
    {
      icon: FaShieldAlt,
      label: "Trust Center",
      href: "#",
      color: "#15803d",
      bgColor: "bg-green-50",
      hoverBg: "hover:bg-green-100",
    },
  ];

  return (
    <section
      id="contact"
      className="py-16 md:py-24 px-6 md:px-10 relative z-1 bg-gradient-to-b from-white via-slate-50 to-slate-100/80 overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e89c3e]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#f5b800]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e89c3e]/5 rounded-full blur-3xl"></div>

        {/* Floating Particles */}
        <div
          className="absolute top-20 left-20 w-2 h-2 bg-[#d97706] rounded-full animate-float opacity-60"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute bottom-40 right-20 w-3 h-3 bg-[#f5b800] rounded-full animate-float opacity-60"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-2 h-2 bg-[#d97706] rounded-full animate-float opacity-60"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-[#e89c3e]/30 rounded-full animate-float opacity-40"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 border border-slate-200 rounded-full text-[11px] tracking-[0.15em] uppercase text-slate-600 bg-white shadow-sm mb-4 animate-fade-in font-medium">
            <span className="w-1.5 h-1.5 bg-[#d97706] rounded-full shadow-md shadow-[#d97706]/50 animate-pulse-slow"></span>
            Get in Touch
            <FaHandSparkles className="w-3 h-3 text-[#d97706] ml-1" />
          </div>
          <h2 className="font-syne font-bold text-[clamp(32px,5vw,50px)] tracking-[-0.03em] text-slate-900 leading-tight">
            Contact{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#d97706] via-[#f5b800] to-[#b45309] bg-clip-text text-transparent animate-gradient font-extrabold">
                Us
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#d97706] to-transparent"></span>
            </span>
          </h2>
          <p className="text-slate-600 max-w-[600px] mx-auto mt-4 text-sm leading-relaxed font-medium">
            Have questions? We're here to help. Reach out to us through any of
            the channels below.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, idx) => {
            const IconComponent = info.icon;
            return (
              <div
                key={idx}
                className="group bg-white border border-slate-200 rounded-xl p-6 text-center transition-all duration-500 hover:border-[#d97706]/40 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#e89c3e]/10 relative overflow-hidden shadow-sm"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                <div className="relative z-10">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br from-amber-50 to-orange-50/50 border ${info.borderColor} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-md group-hover:shadow-[#e89c3e]/20`}
                  >
                    <IconComponent className="w-5 h-5 text-[#d97706] group-hover:text-[#b45309] transition-colors" />
                  </div>
                  <h3 className="font-syne font-bold text-sm text-slate-900 mb-2 group-hover:text-[#d97706] transition-colors">
                    {info.title}
                  </h3>
                  {info.details.map((detail, dIdx) => (
                    <div
                      key={dIdx}
                      className="text-slate-600 text-sm group-hover:text-slate-800 transition-colors font-medium"
                    >
                      {detail}
                    </div>
                  ))}
                  <div className="text-slate-400 text-xs mt-1.5 font-medium group-hover:text-slate-500 transition-colors">
                    {info.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Form & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form - Takes 2 columns */}
          <div
            ref={formRef}
            className="lg:col-span-2 bg-gradient-to-br from-white via-slate-50 to-amber-50/20 border border-slate-200 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-md"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e89c3e]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f5b800]/10 rounded-full blur-3xl"></div>

            <div className="relative">
              <h3 className="font-syne font-bold text-xl text-slate-900 mb-6 flex items-center gap-2.5">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-200 rounded-lg flex items-center justify-center shadow-sm">
                  <FaCommentDots className="w-4 h-4 text-[#d97706]" />
                </div>
                Send us a Message
                <span className="ml-auto text-[10px] text-slate-500 flex items-center gap-1 font-semibold">
                  <FaRocket className="w-3 h-3 text-[#d97706]" /> Quick Response
                </span>
              </h3>

              {submitSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-sm font-semibold mb-4 flex items-center gap-2 animate-fade-in shadow-sm">
                  <FaCheckCircle className="w-4 h-4 flex-shrink-0 text-emerald-600" />{" "}
                  Your message has been sent successfully! We'll get back to you
                  soon.
                </div>
              )}

              {submitError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-sm font-semibold mb-4 flex items-center gap-2 animate-shake shadow-sm">
                  <FaExclamationTriangle className="w-4 h-4 flex-shrink-0 text-rose-600" />{" "}
                  Something went wrong. Please try again.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-slate-700 font-bold uppercase tracking-[0.1em] flex items-center gap-1.5">
                      <FaUser className="w-3 h-3 text-[#d97706]" />
                      Full Name *
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Your full name"
                        className={`w-full bg-slate-50 border rounded-xl px-4 py-3.5 pl-11 text-slate-800 placeholder-slate-400 text-sm outline-none transition-all duration-300 ${
                          focusedField === "name"
                            ? "border-[#d97706] bg-white ring-2 ring-[#e89c3e]/20"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                        required
                      />
                      <FaUser
                        className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                          focusedField === "name"
                            ? "text-[#d97706]"
                            : "text-slate-400"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-slate-700 font-bold uppercase tracking-[0.1em] flex items-center gap-1.5">
                      <HiOutlineMail className="w-3 h-3 text-[#d97706]" />
                      Email *
                    </label>
                    <div className="relative group">
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="your@email.com"
                        className={`w-full bg-slate-50 border rounded-xl px-4 py-3.5 pl-11 text-slate-800 placeholder-slate-400 text-sm outline-none transition-all duration-300 ${
                          focusedField === "email"
                            ? "border-[#d97706] bg-white ring-2 ring-[#e89c3e]/20"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                        required
                      />
                      <HiOutlineMail
                        className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                          focusedField === "email"
                            ? "text-[#d97706]"
                            : "text-slate-400"
                        }`}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-slate-700 font-bold uppercase tracking-[0.1em] flex items-center gap-1.5">
                      <LuPhone className="w-3 h-3 text-[#d97706]" />
                      Phone Number
                    </label>
                    <div className="relative group">
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="+91 98765 43210"
                        className={`w-full bg-slate-50 border rounded-xl px-4 py-3.5 pl-11 text-slate-800 placeholder-slate-400 text-sm outline-none transition-all duration-300 ${
                          focusedField === "phone"
                            ? "border-[#d97706] bg-white ring-2 ring-[#e89c3e]/20"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      />
                      <LuPhone
                        className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                          focusedField === "phone"
                            ? "text-[#d97706]"
                            : "text-slate-400"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-slate-700 font-bold uppercase tracking-[0.1em] flex items-center gap-1.5">
                      <FaCommentDots className="w-3 h-3 text-[#d97706]" />
                      Subject
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("subject")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="How can we help?"
                        className={`w-full bg-slate-50 border rounded-xl px-4 py-3.5 pl-11 text-slate-800 placeholder-slate-400 text-sm outline-none transition-all duration-300 ${
                          focusedField === "subject"
                            ? "border-[#d97706] bg-white ring-2 ring-[#e89c3e]/20"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      />
                      <FaCommentDots
                        className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                          focusedField === "subject"
                            ? "text-[#d97706]"
                            : "text-slate-400"
                        }`}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mb-6">
                  <label className="text-[11px] text-slate-700 font-bold uppercase tracking-[0.1em] flex items-center gap-1.5">
                    <FaCommentDots className="w-3 h-3 text-[#d97706]" />
                    Message *
                  </label>
                  <div className="relative group">
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell us about your query..."
                      rows={4}
                      className={`w-full bg-slate-50 border rounded-xl px-4 py-3.5 text-slate-800 placeholder-slate-400 text-sm outline-none transition-all duration-300 resize-y min-h-[100px] ${
                        focusedField === "message"
                          ? "border-[#d97706] bg-white ring-2 ring-[#e89c3e]/20"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                      required
                    ></textarea>
                    <div className="absolute bottom-3 right-3 text-[10px] text-slate-400 font-medium">
                      {formData.message.length > 0 && (
                        <span>{formData.message.length} characters</span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#e89c3e] to-[#f5b800] text-slate-950 py-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2.5 hover:scale-[1.01] hover:shadow-xl hover:shadow-[#e89c3e]/20 disabled:opacity-70 disabled:hover:scale-100 cursor-pointer relative overflow-hidden group shadow-md"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#f5b800] to-[#e89c3e] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  {isSubmitting ? (
                    <div className="flex items-center gap-2 relative z-10 font-bold">
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </div>
                  ) : (
                    <>
                      <IoMdSend className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform text-slate-950" />
                      <span className="relative z-10">Send Message</span>
                      <FaHandSparkles className="w-3 h-3 relative z-10 group-hover:rotate-12 transition-transform text-slate-950" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Quick Actions - Takes 1 column */}
          <div className="flex flex-col gap-6">
            {/* Quick Contact */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#e89c3e]/10 rounded-full blur-2xl"></div>
              <div className="relative">
                <h3 className="font-syne font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                  <FaRocket className="w-4 h-4 text-[#d97706]" />
                  Quick Contact
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {quickLinks.map((link, idx) => {
                    const LinkIcon = link.icon;
                    return (
                      <a
                        key={idx}
                        href={link.href}
                        target={
                          link.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          link.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className={`flex flex-col items-center gap-2 p-4 border border-slate-200 rounded-xl transition-all duration-300 group hover:scale-105 hover:shadow-md ${link.bgColor} ${link.hoverBg}`}
                      >
                        <LinkIcon className="w-5 h-5 text-slate-600 group-hover:text-[#d97706] transition-colors" />
                        <span className="text-slate-700 text-xs font-semibold group-hover:text-slate-900 transition-colors">
                          {link.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden shadow-sm">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#f5b800]/10 rounded-full blur-2xl"></div>
              <div className="relative">
                <h3 className="font-syne font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                  <FaGlobe className="w-4 h-4 text-[#d97706]" />
                  Follow Us
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social, idx) => {
                    const SocialIcon = social.icon;
                    return (
                      <a
                        key={idx}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl transition-all duration-300 group hover:border-[#d97706] hover:bg-amber-50/50 hover:scale-105 hover:shadow-sm"
                      >
                        <SocialIcon className="w-4 h-4 text-slate-500 group-hover:text-[#d97706] transition-colors" />
                        <span className="text-slate-700 text-xs font-semibold group-hover:text-slate-900 transition-colors">
                          {social.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl transition-all duration-300 hover:bg-emerald-100 hover:scale-[1.01] hover:shadow-md"
            >
              <FaWhatsapp className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
              <span className="text-emerald-950 text-sm font-bold group-hover:text-emerald-700 transition-colors">
                Chat with us on WhatsApp
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
