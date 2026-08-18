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
      color: "#25d366",
      gradient: "from-green-500/20 to-green-600/10",
      borderColor: "border-green-500/30",
    },
    {
      icon: MdEmail,
      title: "Email",
      details: ["info@ssfinworld.com", "support@ssfinworld.com"],
      subtitle: "24/7 Support",
      color: "#e89c3e",
      gradient: "from-amber-500/20 to-amber-600/10",
      borderColor: "border-amber-500/30",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Address",
      details: ["Kolkata, West Bengal"],
      subtitle: "India",
      color: "#f5b800",
      gradient: "from-yellow-500/20 to-yellow-600/10",
      borderColor: "border-yellow-500/30",
    },
    {
      icon: FaClock,
      title: "Working Hours",
      details: ["Monday - Saturday", "10:00 AM - 7:00 PM"],
      subtitle: "Sunday Closed",
      color: "#6ab04c",
      gradient: "from-green-500/20 to-green-600/10",
      borderColor: "border-green-500/30",
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
      color: "#25d366",
      bgColor: "bg-[#25d366]/10",
      hoverBg: "hover:bg-[#25d366]/20",
    },
    {
      icon: FaHeadset,
      label: "Support",
      href: "tel:+919876543210",
      color: "#e89c3e",
      bgColor: "bg-[#e89c3e]/10",
      hoverBg: "hover:bg-[#e89c3e]/20",
    },
    {
      icon: FaGlobe,
      label: "Website",
      href: "#",
      color: "#f5b800",
      bgColor: "bg-[#f5b800]/10",
      hoverBg: "hover:bg-[#f5b800]/20",
    },
    {
      icon: FaShieldAlt,
      label: "Trust Center",
      href: "#",
      color: "#6ab04c",
      bgColor: "bg-[#6ab04c]/10",
      hoverBg: "hover:bg-[#6ab04c]/20",
    },
  ];

  return (
    <section
      id="contact"
      className="py-16 md:py-24 px-6 md:px-10 relative z-1 bg-gradient-to-b from-[#0c0b0a] via-[#0c0b0a] to-[#15130f] overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e89c3e]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#f5b800]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e89c3e]/3 rounded-full blur-3xl"></div>

        {/* Floating Particles */}
        <div
          className="absolute top-20 left-20 w-2 h-2 bg-[#e89c3e] rounded-full animate-float"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute bottom-40 right-20 w-3 h-3 bg-[#f5b800] rounded-full animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-2 h-2 bg-[#e89c3e] rounded-full animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-[#e89c3e]/30 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 border border-white/16 rounded-full text-[11px] tracking-[0.15em] uppercase text-[#8a7f6e] bg-[#15130f]/60 mb-4 animate-fade-in">
            <span className="w-1.5 h-1.5 bg-[#e89c3e] rounded-full shadow-lg shadow-[#e89c3e] animate-pulse-slow"></span>
            Get in Touch
            <FaHandSparkles className="w-3 h-3 text-[#e89c3e] ml-1" />
          </div>
          <h2 className="font-syne font-bold text-[clamp(32px,5vw,50px)] tracking-[-0.03em] text-[#f4ede0] leading-tight">
            Contact{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#e89c3e] via-[#f5b800] to-[#e89c3e] bg-clip-text text-transparent animate-gradient">
                Us
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#e89c3e] to-transparent"></span>
            </span>
          </h2>
          <p className="text-[#8a7f6e] max-w-[600px] mx-auto mt-4 text-sm leading-relaxed">
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
                className="group bg-[#15130f] border border-white/10 rounded-xl p-6 text-center transition-all duration-500 hover:border-[#e89c3e]/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#e89c3e]/10 relative overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                <div className="relative z-10">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br from-[#e89c3e]/15 to-[#f5b800]/10 border ${info.borderColor} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg group-hover:shadow-[#e89c3e]/20`}
                  >
                    <IconComponent className="w-5 h-5 text-[#e89c3e] group-hover:text-[#f5b800] transition-colors" />
                  </div>
                  <h3 className="font-syne font-bold text-sm text-[#f4ede0] mb-2 group-hover:text-[#e89c3e] transition-colors">
                    {info.title}
                  </h3>
                  {info.details.map((detail, dIdx) => (
                    <div
                      key={dIdx}
                      className="text-[#8a7f6e] text-sm group-hover:text-[#f4ede0]/80 transition-colors"
                    >
                      {detail}
                    </div>
                  ))}
                  <div className="text-[#6b6356] text-xs mt-1.5 group-hover:text-[#8a7f6e] transition-colors">
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
            className="lg:col-span-2 bg-gradient-to-br from-[#15130f] to-[#1d1a14] border border-white/10 rounded-2xl p-6 md:p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e89c3e]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f5b800]/5 rounded-full blur-3xl"></div>

            <div className="relative">
              <h3 className="font-syne font-bold text-xl text-[#f4ede0] mb-6 flex items-center gap-2.5">
                <div className="w-8 h-8 bg-gradient-to-br from-[#e89c3e]/20 to-[#f5b800]/20 border border-[#e89c3e]/30 rounded-lg flex items-center justify-center">
                  <FaCommentDots className="w-4 h-4 text-[#e89c3e]" />
                </div>
                Send us a Message
                <span className="ml-auto text-[10px] text-[#6b6356] flex items-center gap-1">
                  <FaRocket className="w-3 h-3" /> Quick Response
                </span>
              </h3>

              {submitSuccess && (
                <div className="bg-[#6ab04c]/10 border border-[#6ab04c]/20 text-[#6ab04c] p-4 rounded-xl text-sm font-medium mb-4 flex items-center gap-2 animate-fade-in">
                  <FaCheckCircle className="w-4 h-4 flex-shrink-0" /> Your
                  message has been sent successfully! We'll get back to you
                  soon.
                </div>
              )}

              {submitError && (
                <div className="bg-[#eb5757]/10 border border-[#eb5757]/20 text-[#eb5757] p-4 rounded-xl text-sm font-medium mb-4 flex items-center gap-2 animate-shake">
                  <FaExclamationTriangle className="w-4 h-4 flex-shrink-0" />{" "}
                  Something went wrong. Please try again.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#8a7f6e] font-semibold uppercase tracking-[0.1em] flex items-center gap-1.5">
                      <FaUser className="w-3 h-3 text-[#e89c3e]" />
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
                        className={`w-full bg-[#1d1a14] border rounded-xl px-4 py-3.5 pl-11 text-[#f4ede0] text-sm outline-none transition-all duration-300 ${
                          focusedField === "name"
                            ? "border-[#e89c3e] bg-[#28241c] shadow-[0_0_0_3px_rgba(232,156,62,0.1)]"
                            : "border-white/10 hover:border-white/20"
                        }`}
                        required
                      />
                      <FaUser
                        className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                          focusedField === "name"
                            ? "text-[#e89c3e]"
                            : "text-[#8a7f6e]"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#8a7f6e] font-semibold uppercase tracking-[0.1em] flex items-center gap-1.5">
                      <HiOutlineMail className="w-3 h-3 text-[#e89c3e]" />
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
                        className={`w-full bg-[#1d1a14] border rounded-xl px-4 py-3.5 pl-11 text-[#f4ede0] text-sm outline-none transition-all duration-300 ${
                          focusedField === "email"
                            ? "border-[#e89c3e] bg-[#28241c] shadow-[0_0_0_3px_rgba(232,156,62,0.1)]"
                            : "border-white/10 hover:border-white/20"
                        }`}
                        required
                      />
                      <HiOutlineMail
                        className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                          focusedField === "email"
                            ? "text-[#e89c3e]"
                            : "text-[#8a7f6e]"
                        }`}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#8a7f6e] font-semibold uppercase tracking-[0.1em] flex items-center gap-1.5">
                      <LuPhone className="w-3 h-3 text-[#e89c3e]" />
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
                        className={`w-full bg-[#1d1a14] border rounded-xl px-4 py-3.5 pl-11 text-[#f4ede0] text-sm outline-none transition-all duration-300 ${
                          focusedField === "phone"
                            ? "border-[#e89c3e] bg-[#28241c] shadow-[0_0_0_3px_rgba(232,156,62,0.1)]"
                            : "border-white/10 hover:border-white/20"
                        }`}
                      />
                      <LuPhone
                        className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                          focusedField === "phone"
                            ? "text-[#e89c3e]"
                            : "text-[#8a7f6e]"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#8a7f6e] font-semibold uppercase tracking-[0.1em] flex items-center gap-1.5">
                      <FaCommentDots className="w-3 h-3 text-[#e89c3e]" />
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
                        className={`w-full bg-[#1d1a14] border rounded-xl px-4 py-3.5 pl-11 text-[#f4ede0] text-sm outline-none transition-all duration-300 ${
                          focusedField === "subject"
                            ? "border-[#e89c3e] bg-[#28241c] shadow-[0_0_0_3px_rgba(232,156,62,0.1)]"
                            : "border-white/10 hover:border-white/20"
                        }`}
                      />
                      <FaCommentDots
                        className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                          focusedField === "subject"
                            ? "text-[#e89c3e]"
                            : "text-[#8a7f6e]"
                        }`}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mb-6">
                  <label className="text-[11px] text-[#8a7f6e] font-semibold uppercase tracking-[0.1em] flex items-center gap-1.5">
                    <FaCommentDots className="w-3 h-3 text-[#e89c3e]" />
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
                      className={`w-full bg-[#1d1a14] border rounded-xl px-4 py-3.5 text-[#f4ede0] text-sm outline-none transition-all duration-300 resize-y min-h-[100px] ${
                        focusedField === "message"
                          ? "border-[#e89c3e] bg-[#28241c] shadow-[0_0_0_3px_rgba(232,156,62,0.1)]"
                          : "border-white/10 hover:border-white/20"
                      }`}
                      required
                    ></textarea>
                    <div className="absolute bottom-3 right-3 text-[10px] text-[#6b6356]">
                      {formData.message.length > 0 && (
                        <span>{formData.message.length} characters</span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#e89c3e] to-[#f5b800] text-[#0c0b0a] py-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2.5 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#e89c3e]/40 disabled:opacity-70 disabled:hover:scale-100 cursor-pointer relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#f5b800] to-[#e89c3e] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  {isSubmitting ? (
                    <div className="flex items-center gap-2 relative z-10">
                      <div className="w-4 h-4 border-2 border-[#0c0b0a] border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </div>
                  ) : (
                    <>
                      <IoMdSend className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                      <span className="relative z-10">Send Message</span>
                      <FaHandSparkles className="w-3 h-3 relative z-10 group-hover:rotate-12 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Quick Actions - Takes 1 column */}
          <div className="flex flex-col gap-6">
            {/* Quick Contact */}
            <div className="bg-[#15130f] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#e89c3e]/5 rounded-full blur-2xl"></div>
              <div className="relative">
                <h3 className="font-syne font-bold text-lg text-[#f4ede0] mb-4 flex items-center gap-2">
                  <FaRocket className="w-4 h-4 text-[#e89c3e]" />
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
                        className={`flex flex-col items-center gap-2 p-4 bg-[#1d1a14] border border-white/10 rounded-xl transition-all duration-300 group hover:scale-105 hover:shadow-lg ${link.bgColor} ${link.hoverBg}`}
                      >
                        <LinkIcon className="w-5 h-5 text-[#8a7f6e] group-hover:text-[#e89c3e] transition-colors" />
                        <span className="text-[#8a7f6e] text-xs group-hover:text-[#f4ede0] transition-colors">
                          {link.label}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-[#15130f] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#f5b800]/5 rounded-full blur-2xl"></div>
              <div className="relative">
                <h3 className="font-syne font-bold text-lg text-[#f4ede0] mb-4 flex items-center gap-2">
                  <FaGlobe className="w-4 h-4 text-[#e89c3e]" />
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
                        className="flex items-center gap-2 px-3 py-2.5 bg-[#1d1a14] border border-white/10 rounded-xl transition-all duration-300 group hover:border-[#e89c3e] hover:scale-105 hover:shadow-lg"
                      >
                        <SocialIcon className="w-4 h-4 text-[#8a7f6e] group-hover:text-[#e89c3e] transition-colors" />
                        <span className="text-[#8a7f6e] text-xs group-hover:text-[#f4ede0] transition-colors">
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
              className="group flex items-center justify-center gap-3 p-4 bg-[#25d366]/10 border border-[#25d366]/20 rounded-2xl transition-all duration-300 hover:bg-[#25d366]/20 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#25d366]/20"
            >
              <FaWhatsapp className="w-5 h-5 text-[#25d366] group-hover:scale-110 transition-transform" />
              <span className="text-[#f4ede0] text-sm font-medium group-hover:text-[#25d366] transition-colors">
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
