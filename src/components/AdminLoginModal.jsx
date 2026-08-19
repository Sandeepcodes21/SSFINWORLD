import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Shield,
  User,
  Key,
  LogIn,
  AlertCircle,
  Info,
  Loader2,
  UserPlus,
  Mail,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react";

const AdminLoginModal = ({ isOpen, onClose, onLogin, onRegister }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const usernameRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => usernameRef.current?.focus(), 200);
      setError("");
      setSuccess("");
      setUsername("");
      setPassword("");
      setEmail("");
      setFullName("");
      setConfirmPassword("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const result = await onLogin(username, password);
      if (!result.success) {
        setError(
          result.error || "❌ Galat username ya password! Dobara try karein.",
        );
        setPassword("");
        setIsLoading(false);
        setTimeout(() => usernameRef.current?.focus(), 100);
      } else {
        setIsLoading(false);
        setUsername("");
        setPassword("");
        onClose();
      }
    } catch (err) {
      setError("❌ Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const result = await onRegister({
        username,
        password,
        email,
        fullName: fullName || username,
      });

      if (!result.success) {
        setError(result.error || "❌ Registration failed. Please try again.");
        setIsLoading(false);
      } else {
        setSuccess("✅ Account created successfully!");
        setIsLoading(false);
        setUsername("");
        setPassword("");
        setEmail("");
        setFullName("");
        setConfirmPassword("");
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (err) {
      setError("❌ Registration failed. Please try again.");
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[2000] flex items-center justify-center p-3 sm:p-5 animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`bg-white border border-slate-200 shadow-2xl rounded-2xl w-full p-5 sm:p-8 md:p-9 relative transform transition-all duration-300 max-h-[90vh] overflow-y-auto ${
          isLoginMode ? "max-w-[440px]" : "max-w-[560px]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 bg-slate-100 border border-slate-200 rounded-full text-slate-500 flex items-center justify-center transition-all duration-300 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 hover:rotate-90 z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Icon Badge */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-600 mb-4 sm:mb-5 shadow-sm">
          {isLoginMode ? (
            <Shield className="w-6 h-6 sm:w-7 sm:h-7" />
          ) : (
            <UserPlus className="w-6 h-6 sm:w-7 sm:h-7" />
          )}
        </div>

        {/* Title & Description */}
        <h2 className="font-syne font-bold text-xl sm:text-2xl tracking-tight text-slate-900 mb-1.5">
          {isLoginMode ? "Admin Access" : "Create Admin Account"}
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mb-5 leading-relaxed font-medium">
          {isLoginMode
            ? "Car listing form ko access karne ke liye admin credentials daalein."
            : "Naya admin account banayein aur car listings manage karein."}
        </p>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-2.5 bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs sm:text-sm font-semibold mb-4 animate-shake">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />{" "}
            {error}
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs sm:text-sm font-semibold mb-4 animate-fade-in">
            <CheckCircle className="w-4 h-4 flex-shrink-0 text-emerald-600" />{" "}
            {success}
          </div>
        )}

        {/* Toggle Login/Register */}
        <div className="flex bg-slate-100 rounded-xl p-1 mb-5 sm:mb-6 border border-slate-200/80">
          <button
            onClick={() => {
              setIsLoginMode(true);
              setError("");
              setSuccess("");
            }}
            className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 ${
              isLoginMode
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsLoginMode(false);
              setError("");
              setSuccess("");
            }}
            className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 ${
              !isLoginMode
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Register
          </button>
        </div>

        {isLoginMode ? (
          // ====== LOGIN FORM ======
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label className="text-[11px] text-slate-700 font-bold uppercase tracking-[0.1em] block mb-2">
                Username
              </label>
              <div className="relative">
                <input
                  ref={usernameRef}
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Admin username daalein"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-11 text-slate-900 text-sm outline-none transition-all duration-300 focus:border-[#d97706] focus:bg-white focus:ring-2 focus:ring-[#e89c3e]/20 font-medium"
                  required
                  autoComplete="off"
                />
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              </div>
            </div>

            <div className="mb-6">
              <label className="text-[11px] text-slate-700 font-bold uppercase tracking-[0.1em] block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password daalein"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-11 pr-11 text-slate-900 text-sm outline-none transition-all duration-300 focus:border-[#d97706] focus:bg-white focus:ring-2 focus:ring-[#e89c3e]/20 font-medium"
                  required
                />
                <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#e89c3e] to-[#f5b800] text-slate-950 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2.5 hover:shadow-lg hover:shadow-[#e89c3e]/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:hover:scale-100 cursor-pointer shadow-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 text-slate-950" /> Login Karein
                </>
              )}
            </button>
          </form>
        ) : (
          // ====== RESPONSIVE REGISTER FORM ======
          <form onSubmit={handleRegisterSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-4">
              {/* Username */}
              <div>
                <label className="text-[11px] text-slate-700 font-bold uppercase tracking-[0.1em] block mb-1.5">
                  Username *
                </label>
                <div className="relative">
                  <input
                    ref={usernameRef}
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose username"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 sm:py-3 pl-10 text-slate-900 text-sm outline-none transition-all duration-300 focus:border-[#d97706] focus:bg-white focus:ring-2 focus:ring-[#e89c3e]/20 font-medium"
                    required
                    minLength={3}
                    autoComplete="off"
                  />
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                </div>
                <p className="text-[10px] text-slate-400 mt-1 font-medium">
                  Min 3 chars
                </p>
              </div>

              {/* Full Name */}
              <div>
                <label className="text-[11px] text-slate-700 font-bold uppercase tracking-[0.1em] block mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 sm:py-3 pl-10 text-slate-900 text-sm outline-none transition-all duration-300 focus:border-[#d97706] focus:bg-white focus:ring-2 focus:ring-[#e89c3e]/20 font-medium"
                  />
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                </div>
              </div>

              {/* Email - Full width on mobile/tablet grid */}
              <div className="sm:col-span-2">
                <label className="text-[11px] text-slate-700 font-bold uppercase tracking-[0.1em] block mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 sm:py-3 pl-10 text-slate-900 text-sm outline-none transition-all duration-300 focus:border-[#d97706] focus:bg-white focus:ring-2 focus:ring-[#e89c3e]/20 font-medium"
                  />
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-[11px] text-slate-700 font-bold uppercase tracking-[0.1em] block mb-1.5">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Choose password"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 sm:py-3 pl-10 pr-9 text-slate-900 text-sm outline-none transition-all duration-300 focus:border-[#d97706] focus:bg-white focus:ring-2 focus:ring-[#e89c3e]/20 font-medium"
                    required
                    minLength={6}
                  />
                  <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-3.5 h-3.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 mt-1 font-medium">
                  Min 6 chars
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-[11px] text-slate-700 font-bold uppercase tracking-[0.1em] block mb-1.5">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 sm:py-3 pl-10 text-slate-900 text-sm outline-none transition-all duration-300 focus:border-[#d97706] focus:bg-white focus:ring-2 focus:ring-[#e89c3e]/20 font-medium"
                    required
                  />
                  <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#e89c3e] to-[#f5b800] text-slate-950 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2.5 hover:shadow-lg hover:shadow-[#e89c3e]/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:hover:scale-100 cursor-pointer shadow-sm mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 text-slate-950" /> Create Account
                </>
              )}
            </button>
          </form>
        )}

        <div className="text-center mt-5 text-xs text-slate-500 font-medium">
          <Info className="inline w-3.5 h-3.5 mr-1.5 text-slate-400" />
          {isLoginMode
            ? "Don't have an account? Click Register above"
            : "Already have an account? Click Login above"}
        </div>
      </div>
    </div>
  );
};

export default AdminLoginModal;
